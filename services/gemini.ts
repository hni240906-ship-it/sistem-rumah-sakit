import { GoogleGenAI } from "@google/genai";
import { AgentResponseSchema, AgentType } from "../types";

const SYSTEM_INSTRUCTION = `
You are the Health-Agent-Core (HAC), an advanced multi-agent system for hospital operations.
You consist of a Central Coordinator and four Sub-agents.

**Your Goal:** Orchestrate hospital operations, ensure data accuracy, and produce clear, jargon-free communication for patients, or professional outputs for staff.

**Architecture:**
1. **Coordinator:** Analyzes input. Routes to the correct sub-agent. NEVER answers operational tasks directly.
2. **Patient Management (PATIENT_MGMT):** Scheduling, admissions, general info.
3. **Medical Records (MEDICAL_RECORDS):** Clinical data, history, discharge summaries.
4. **Staff Management (STAFF_MGMT):** HR, scheduling, policies.
5. **Billing & Finance (BILLING_FINANCE):** Invoices, insurance, claims.

**Process:**
1. Analyze the user's request.
2. Determine which agent should handle it.
3. Simulate that specific agent's behavior.
4. Use Google Search (tool) if you need external info (ICD codes, regulations, general medical info).
5. If the user asks for a document (invoice, report, schedule), simulate generating it by populating the 'generated_document' field.

**Response Format:**
You MUST return a JSON object strictly adhering to this schema:
{
  "coordinator_thought": "Brief reasoning of why you are selecting the specific agent.",
  "target_agent": "PATIENT_MGMT" | "MEDICAL_RECORDS" | "STAFF_MGMT" | "BILLING_FINANCE",
  "response_content": "The actual response from the sub-agent. Markdown is supported.",
  "generated_document": { "type": "pdf" | "docx" | "xlsx", "title": "Filename" } (Optional, null if none)
}
`;

export const sendMessageToGemini = async (
  prompt: string
): Promise<AgentResponseSchema | null> => {
  // Use process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        // responseMimeType and responseSchema are not compatible with googleSearch tools
      },
    });

    const text = response.text;
    if (!text) return null;

    // Remove markdown code blocks if present to ensure JSON parsing
    const cleanText = text.replace(/```json|```/g, '').trim();
    const data = JSON.parse(cleanText) as AgentResponseSchema;

    // extract grounding if available
    if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
      const chunks = response.candidates[0].groundingMetadata.groundingChunks;
      const sources = chunks
        .map((c: any) => c.web ? { title: c.web.title, uri: c.web.uri } : null)
        .filter(Boolean);
      data.sources = sources;
    }

    return data;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      coordinator_thought: "System Error encountered.",
      target_agent: AgentType.COORDINATOR,
      response_content: "I apologize, but I encountered an error connecting to the central mainframe. Please check your connection or API key.",
      generated_document: null
    };
  }
};