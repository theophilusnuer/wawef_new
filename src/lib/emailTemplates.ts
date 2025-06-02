export const emailTemplates = {
  subscription: {
    subject: "Welcome to the WAWEF Newsletter!",
    text: `Dear {firstName},\n\nThank you for subscribing to the West Africa Women Empowerment Foundation (WAWEF) Newsletter! We're excited to keep you updated on our mission to empower women and girls in West Africa.\n\nBest regards,\nThe WAWEF Team`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #fff; padding: 25px;">
        <div style="max-width: 600px; margin: auto; background-color: #fffef5; border-radius: 10px; overflow: hidden;">
          <!-- Header -->
          <div style="background-color: #F2C94C; padding: 20px; text-align: center;">
            <img src="https://i.imgur.com/01lPQL3.png" alt="WAWEF Logo" style="height: 50px; vertical-align: middle;" />
            <h2 style="margin: 0; font-size: 15px; color: #000; font-weight: bold;">WEST AFRICA WOMEN EMPOWERMENT FOUNDATION</h2>
          </div>

          <!-- Body -->
          <div style="padding: 30px; font-size: 14px;">
            <h4 style="color: #000;">Welcome {firstName},</h4>
            <p style="line-height: 1.6; color: #333;">
              Thank you for subscribing to the West Africa Women Empowerment Foundation (WAWEF) Newsletter!
            </p>
            <p style="line-height: 1.6; color: #333;">
              We're excited to keep you updated on our mission to empower women and girls in West Africa.
            </p>
            <br />
            <p style="line-height: 1.6; color: #333;">
              Best regards,<br />WAWEF Team
            </p>
            <p style="line-height: 1.6; color: #888; font-size: 12px;">
              <a href="https://yourdomain.com/api/newsletter?email={email}&action=unsubscribe" style="color: #F2C94C; text-decoration: none;">
                Unsubscribe
              </a>
            </p>
          </div>

          <!-- Footer -->
          <div style="padding: 20px; text-align: center; background-color: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
            <p style="font-size: 14px; color: #888;">Connect with us on social media</p>
            <div style="margin: 10px 0;">
              <a href="https://www.facebook.com/share/1E671tfEF1/" style="margin: 0 6px;">
                <img src="https://i.imgur.com/8E8o2Xk.png" alt="Facebook" style="width: 23px; height: 23px;" />
              </a>
              <a href="https://www.instagram.com/wawef_org?igsh=a2VpNHZmcndqMWY0" style="margin: 0 6px;">
                <img src="https://i.imgur.com/Ud6zo1r.png" alt="Instagram" style="width: 23px; height: 23px;" />
              </a>
              <a href="https://www.linkedin.com/company/wawef/" style="margin: 0 6px;">
                <img src="https://i.imgur.com/hnuDk1G.png" alt="LinkedIn" style="width: 23px; height: 23px;" />
              </a>
              <a href="https://youtube.com/@wawef?si=F96u-yypKQboLJVg" style="margin: 0 6px;">
                <img src="https://i.imgur.com/rs53JVm.png" alt="YouTube" style="width: 23px; height: 23px;" />
              </a>
            </div>
            <p style="font-size: 12px; color: #999;">© ${new Date().getFullYear()} WAWEF. All rights reserved.</p>
          </div>
        </div>
      </div>
    `,
  },
  donation: {
    subject: "Thank You for Your Donation!",
    text: `Dear {firstName},\n\nThank you for your generous {donationType} to the West Africa Women Empowerment Foundation (WAWEF). Your support helps empower women and girls in West Africa.\n\nBest regards,\nThe WAWEF Team`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #fff; padding: 25px;">
        <div style="max-width: 600px; margin: auto; background-color: #fffef5; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #F2C94C; padding: 20px; text-align: center;">
            <img src="https://i.imgur.com/01lPQL3.png" alt="WAWEF Logo" style="height: 50px; vertical-align: middle;" />
            <h2 style="margin: 0; font-size: 15px; color: #000; font-weight: bold;">WEST AFRICA WOMEN EMPOWERMENT FOUNDATION</h2>
          </div>
          <div style="padding: 30px; font-size: 14px;">
            <h4 style="color: #000;">Dear {firstName},</h4>
            <p style="line-height: 1.6; color: #333;">
              Thank you for your generous {donationType} to the West Africa Women Empowerment Foundation (WAWEF).
            </p>
            <p style="line-height: 1.6; color: #333;">
              Your ongoing support is invaluable, and we are deeply grateful for your contribution that helps us continue our mission. Your support helps empower women and girls in West Africa.<br/> We truly appreciate your contribution.<br/>
            </p>
            <p style="line-height: 1.6; color: #333;">
              Best regards,<br />The WAWEF Team
            </p>
          </div>
          <div style="padding: 20px; text-align: center; background-color: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
            <p style="font-size: 14px; color: #888;">Connect with us on social media</p>
            <div style="margin: 10px 0;">
              <a href="https://www.facebook.com/share/1E671tfEF1/" style="margin: 0 6px;">
                <img src="https://i.imgur.com/8E8o2Xk.png" alt="Facebook" style="width: 23px; height: 23px;" />
              </a>
              <a href="https://www.instagram.com/wawef_org?igsh=a2VpNHZmcndqMWY0" style="margin: 0 6px;">
                <img src="https://i.imgur.com/Ud6zo1r.png" alt="Instagram" style="width: 23px; height: 23px;" />
              </a>
              <a href="https://www.linkedin.com/company/wawef/" style="margin: 0 6px;">
                <img src="https://i.imgur.com/hnuDk1G.png" alt="LinkedIn" style="width: 23px; height: 23px;" />
              </a>
              <a href="https://youtube.com/@wawef?si=F96u-yypKQboLJVg" style="margin: 0 6px;">
                <img src="https://i.imgur.com/rs53JVm.png" alt="YouTube" style="width: 23px; height: 23px;" />
              </a>
            </div>
            <p style="font-size: 12px; color: #999;">© ${new Date().getFullYear()} WAWEF. All rights reserved.</p>
          </div>
        </div>
      </div>
    `,
  },
  sponsorship: {
    subject: "Thank You for Sponsoring a Program!",
    text: `Dear {firstName},\n\nThank you for sponsoring the {programTitle} program with the West Africa Women Empowerment Foundation (WAWEF). Your contribution makes a significant impact.\n\nBest regards,\nThe WAWEF Team`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #fff; padding: 25px;">
        <div style="max-width: 600px; margin: auto; background-color: #fffef5; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #F2C94C; padding: 20px; text-align: center;">
            <img src="https://i.imgur.com/01lPQL3.png" alt="WAWEF Logo" style="height: 50px; vertical-align: middle;" />
            <h2 style="margin: 0; font-size: 15px; color: #000; font-weight: bold;">WEST AFRICA WOMEN EMPOWERMENT FOUNDATION</h2>
          </div>
          <div style="padding: 30px; font-size: 14px;">
            <h4 style="color: #000;">Dear {firstName},</h4>
            <p style="line-height: 1.6; color: #333;">
              Thank you for sponsoring the {programTitle} program with the West Africa Women Empowerment Foundation (WAWEF).
            </p>
            <p style="line-height: 1.6; color: #333;">
              Your contribution makes a significant impact, and we are deeply grateful for your contribution that helps us continue our mission. <br/> We truly appreciate your contribution.<br/>
            </p>
            <p style="line-height: 1.6; color: #333;">
              Best regards,<br />The WAWEF Team
            </p>
          </div>
          <div style="padding: 20px; text-align: center; background-color: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
            <p style="font-size: 14px; color: #888;">Connect with us on social media</p>
            <div style="margin: 10px 0;">
              <a href="https://www.facebook.com/share/1E671tfEF1/" style="margin: 0 6px;">
                <img src="https://i.imgur.com/8E8o2Xk.png" alt="Facebook" style="width: 23px; height: 23px;" />
              </a>
              <a href="https://www.instagram.com/wawef_org?igsh=a2VpNHZmcndqMWY0" style="margin: 0 6px;">
                <img src="https://i.imgur.com/Ud6zo1r.png" alt="Instagram" style="width: 23px; height: 23px;" />
              </a>
              <a href="https://www.linkedin.com/company/wawef/" style="margin: 0 6px;">
                <img src="https://i.imgur.com/hnuDk1G.png" alt="LinkedIn" style="width: 23px; height: 23px;" />
              </a>
              <a href="https://youtube.com/@wawef?si=F96u-yypKQboLJVg" style="margin: 0 6px;">
                <img src="https://i.imgur.com/rs53JVm.png" alt="YouTube" style="width: 23px; height: 23px;" />
              </a>
            </div>
            <p style="font-size: 12px; color: #999;">© ${new Date().getFullYear()} WAWEF. All rights reserved.</p>
          </div>
        </div>
      </div>
    `,
  },
};