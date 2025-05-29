import nodemailer from "nodemailer"

interface EmailParams {
  email: string
  name: string
  type: "donation" | "sponsorship"
  amount: number
  donationMode?: "once" | "monthly"
  programTitle?: string
  subscriptionId?: string
  paymentMethod?: "card" | "bank"
  referenceId?: string
}

export async function sendThankYouEmail({
  email,
  name,
  type,
  amount,
  donationMode,
  programTitle,
  subscriptionId,
  paymentMethod = "card",
  referenceId,
}: EmailParams) {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number.parseInt(process.env.EMAIL_SERVER_PORT || "587"),
    secure: process.env.EMAIL_SERVER_PORT === "465",
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  })

  // Generate subject line
  let subject = ""
  if (type === "sponsorship") {
    subject = `Thank you for sponsoring the ${programTitle} Program!`
  } else {
    subject = `Thank you for your ${donationMode === "monthly" ? "monthly" : "one-time"} donation!`
  }

  // Generate email body
  let html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333; text-align: center;">Thank You, ${name}!</h1>
      <p style="font-size: 16px; line-height: 1.5; color: #555;">
        We are deeply grateful for your ${type === "sponsorship" ? "sponsorship" : "donation"} of $${amount.toFixed(2)}.
      </p>
  `

  if (paymentMethod === "bank") {
    html += `
      <p style="font-size: 16px; line-height: 1.5; color: #555;">
        Your bank payment is being processed. This typically takes 3-5 business days to complete.
      </p>
      <p style="font-size: 16px; line-height: 1.5; color: #555;">
        Reference ID: ${referenceId}
      </p>
    `
  }

  if (type === "sponsorship") {
    html += `
      <p style="font-size: 16px; line-height: 1.5; color: #555;">
        Your sponsorship of the ${programTitle} Program will make a significant impact on our ability to empower women and create positive change.
      </p>
    `
  } else if (donationMode === "monthly") {
    const managementUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/manage-subscription?id=${subscriptionId}`
    html += `
      <p style="font-size: 16px; line-height: 1.5; color: #555;">
        Your monthly support is invaluable to our mission. We appreciate your commitment to making a difference.
      </p>
      <p style="font-size: 16px; line-height: 1.5; color: #555;">
        If you need to manage your monthly donation, you can do so by clicking the button below:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${managementUrl}" style="background-color: #F2C94C; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
          Manage My Subscription
        </a>
      </div>
    `
  } else {
    html += `
      <p style="font-size: 16px; line-height: 1.5; color: #555;">
        Your generosity helps us continue our mission to empower women and create positive change in our communities.
      </p>
    `
  }

  html += `
      <p style="font-size: 16px; line-height: 1.5; color: #555;">
        If you have any questions or need assistance, please don't hesitate to contact us.
      </p>
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="font-size: 14px; color: #888;">
          With gratitude,<br>
          The Team
        </p>
      </div>
    </div>
  `

  // Send the email
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject,
      html,
    })
    console.log(`Thank you email sent to ${email}`)
    return true
  } catch (error) {
    console.error("Error sending thank you email:", error)
    return false
  }
}
