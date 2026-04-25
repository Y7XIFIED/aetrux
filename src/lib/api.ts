export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  ok: boolean;
  id?: string;
  message?: string;
}

export const submitContact = async (payload: ContactPayload): Promise<ContactResponse> => {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as ContactResponse;
  if (!response.ok || !data.ok) {
    throw new Error(data.message || "Failed to send message.");
  }
  return data;
};

