export interface EmailPayload {
  from_name: string;
  from_email: string;
  phone: string;
  service: string;
  location?: string;
  message: string;
}

/**
 * Sends an email via the PHP backend (/send_email.php).
 * In development, Vite proxies this to http://localhost:8000.
 * In production, the PHP file must be served from the same domain.
 * Throws an Error if sending fails.
 */
export async function sendEmail(payload: EmailPayload): Promise<void> {
  const body = {
    name:     payload.from_name,
    email:    payload.from_email,
    phone:    payload.phone     || 'Not provided',
    message:  payload.message,
    service:  payload.service   || 'General Inquiry',
    location: payload.location  || '',
  };

  let res: Response;
  try {
    res = await fetch('/send_email.php', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });
  } catch {
    throw new Error(
      'Could not reach the mail server. Make sure the PHP server is running ' +
      '(npm run serve:php) or contact us directly at spysense.info@gmail.com / +91 96324 41604.'
    );
  }

  let data: { success: boolean; message?: string };
  try {
    data = await res.json();
  } catch {
    throw new Error('Unexpected response from mail server. Please try again later.');
  }

  if (!data.success) {
    throw new Error(data.message || 'Unknown error from mail server.');
  }
}
