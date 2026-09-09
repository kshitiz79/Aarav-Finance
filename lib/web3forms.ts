export const WEB3FORMS_ACCESS_KEY = 
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "b9364d0e-1f0e-4405-a468-a87cb74ce2f5";

export interface Web3FormSubmitOptions {
  subject?: string;
  from_name?: string;
  [key: string]: any;
}

/**
 * Sends form data to Web3Forms API to deliver emails.
 */
export async function sendWeb3Form(payload: Record<string, any> | FormData, customSubject?: string): Promise<{ success: boolean; message?: string }> {
  try {
    let formData: FormData;

    if (payload instanceof FormData) {
      formData = payload;
      if (!formData.has("access_key")) {
        formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      }
      if (customSubject && !formData.has("subject")) {
        formData.append("subject", customSubject);
      }
    } else {
      formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      if (customSubject) {
        formData.append("subject", customSubject);
      }
      formData.append("from_name", "Finsocap Website");

      for (const key of Object.keys(payload)) {
        if (payload[key] !== undefined && payload[key] !== null) {
          formData.append(key, String(payload[key]));
        }
      }
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      return { success: true, message: data.message || "Form submitted successfully" };
    } else {
      return { success: false, message: data.message || "Submission failed" };
    }
  } catch (error: any) {
    console.error("Web3Forms submission error:", error);
    return { success: false, message: error?.message || "An unexpected error occurred" };
  }
}
