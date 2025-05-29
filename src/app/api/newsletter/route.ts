import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Subscriber from '@/models/Subscriber';
import transporter from '@/app/utils/Transporter';
import { emailTemplates } from '@/lib/emailTemplates';

export async function POST(request: Request) {
    await mongoose.connect(process.env.MONGODB_URI as string);

    try {
        const { firstName, lastName, email, birthday } = await request.json();

        if (!firstName || !lastName || !email) {
            return NextResponse.json(
                { error: 'First name, last name, and email are required' },
                { status: 400 }
            );
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return NextResponse.json(
                { error: 'This email is already subscribed' },
                { status: 400 }
            );
        }

        await Subscriber.create({
            firstName,
            lastName,
            email,
            birthday,
        });

        const template = emailTemplates.subscription;
        await transporter.sendMail({
            from: `"West Africa Women Empowerment Foundation (WAWEF)" <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: template.subject.replace('{firstName}', firstName),
            text: template.text.replace('{firstName}', firstName),
            html: template.html.replace('{firstName}', firstName),
        });

        return NextResponse.json({ message: 'Subscribed successfully' }, { status: 200 });
    } catch (error: unknown) {
        console.error('Error subscribing to newsletter:', error);
        if (error instanceof mongoose.Error) {
            return NextResponse.json(
                { error: 'This email is already subscribed' },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: 'Failed to subscribe to newsletter' },
            { status: 500 }
        );
    } finally {
        await mongoose.connection.close();
    }
}

export async function DELETE(request: Request) {
    await mongoose.connect(process.env.MONGODB_URI as string);

    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        const subscriber = await Subscriber.findOneAndDelete({ email });
        if (!subscriber) {
            return NextResponse.json(
                { error: 'Subscriber not found' },
                { status: 404 }
            );
        }

        // Send unsubscribe confirmation email
        await transporter.sendMail({
            from: `"West Africa Women Empowerment Foundation (WAWEF)" <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: 'Unsubscribed from WAWEF Newsletter',
            text: `Dear ${subscriber.firstName},\n\nYou have been successfully unsubscribed from the WAWEF Newsletter. We are sorry to see you go! If you change your mind, feel free to subscribe again.\n\nBest regards,\nThe WAWEF Team`,
            html: `
              <div style="font-family: Arial, sans-serif; color: #333; background-color: #fff; padding: 25px;">
                <div style="max-width: 600px; margin: auto; background-color: #fffef5; border-radius: 10px; overflow: hidden;">
                  <div style="background-color: #F2C94C; padding: 20px; text-align: center;">
                    <img src="https://i.imgur.com/01lPQL3.png" alt="WAWEF Logo" style="height: 50px; vertical-align: middle;" />
                    <h2 style="margin: 0; font-size: 15px; color: #000; font-weight: bold;">WEST AFRICA WOMEN EMPOWERMENT FOUNDATION</h2>
                  </div>
                  <div style="padding: 30px; font-size: 14px;">
                    <h4 style="color: #000;">Dear ${subscriber.firstName},</h4>
                    <p style="line-height: 1.6; color: #333;">
                      You have been successfully unsubscribed from the WAWEF Newsletter. We are sorry to see you go!
                    </p>
                    <p style="line-height: 1.6; color: #333;">
                      If you change your mind, feel free to subscribe again at our website.
                    </p><br/>
                    <p style="line-height: 1.6; color: #333;">
                      Best regards,<br />WAWEF Team
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
        });

        return NextResponse.json({ message: 'Unsubscribed successfully' }, { status: 200 });
    } catch (error: unknown) {
        console.error('Error unsubscribing from newsletter:', error);
        return NextResponse.json(
            { error: 'Failed to unsubscribe from newsletter' },
            { status: 500 }
        );
    } finally {
        await mongoose.connection.close();
    }
}