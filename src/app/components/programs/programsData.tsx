import cos from '../../assets/images/cos.webp';
import dev from '../../assets/images/dev.jpg';
import fas from '../../assets/images/fas.webp';
import mantse from '../../assets/images/mantse.jpg';
import raget from '../../assets/images/raget.jpg';
import coshero from '../../assets/images/cos-hero.webp';
import fashero from '../../assets/images/fas-hero.webp';
import cos1 from '../../assets/images/cos1.webp';
import cos2 from '../../assets/images/cos2.webp';
import cos3 from '../../assets/images/cos3.webp';
import cos4 from '../../assets/images/cos4.webp';
import fas1 from '../../assets/images/fas1.webp';
import fas2 from '../../assets/images/fas2.webp';
import fas3 from '../../assets/images/fas3.webp';
import fas4 from '../../assets/images/fas4.webp';
// import eccentric from '../../assets/images/eccentric.png';



export const programsData = [
    {
        title: "Cosmetology - Beauty & Personal Care",
        overview:
            "At the Enock Addico Young Women Technical and Vocational Institute (EAYWTVI), our Cosmetology program empowers young women with practical skills in soap, shampoo, liquid cream production, wig making, hairdressing, makeup, and nail care. This program is designed to provide hands-on training in the beauty and personal care industry, equipping participants with the expertise to start their businesses or secure employment in salons, spas, and cosmetic production companies. With expert mentorship, practical workshops, and access to startup support, we empower young women to thrive in the beauty industry and achieve financial independence.",
        image: cos.src,
        heroImage:coshero.src,
        softSkills: ["Communication Skills", "Teamwork & Collaboration ", "Problem-Solving Skills", "Adaptability & Flexibility", "Emotional Intelligence"],
        industrySkills: [
            "Beauty Therapy and Products – Covers nail care, shampoo, liquid soap and bar soap formulation",
            "Hair Technology – Covers hairdressing, wig-making techniques, and scalp and hair care",
            "Makeup Artistry – Covers commercial makeup, and special effect makeup"
        ],
        specialFeatures: [
            {
              heading: "Career Counseling: ",
              subheading: "We offer personalized guidance to help students identify their career goals, refine their resumes, and prepare for interviews. We assist students in strategizing their job search and connecting them with potential clients or employers.",
            },
            {
              heading: "Workshops and Seminars: ",
              subheading: "Regular workshops on topics such as personal branding, pitching to clients, and financial management for freelancers are offered. These sessions help students build confidence and competence in managing their freelance careers.",
            },
            {
              heading: "Internship Opportunities: ",
              subheading: "We facilitate internship placements with partner businesses and organizations, allowing students to gain real-world experience and establish professional networks before graduation.",
            },
          ],
        gain: [
            "It’s free-of-charge! Beneficiaries gain all the skills they need to launch a career in Cosmetology, at no cost.",
            "Beneficiaries grow in confidence and resilience, while building their first professional network in the training room.",
            "Dedicated mentor support during the program and afterwards to give women the best chance of succeeding and overcoming any challenges.",
            "Post-graduate support through seed funding and expert guidance to help women turn their skills into successful businesses.",
        ],
        partners: ["Ga Mantse Foundation", "Royal Africa Generational Thinkers"],
        partnerLogo:[
          mantse.src,
          raget.src
        ],
        gallery: [
cos1.src,
cos2.src,
cos3.src,
cos4.src,
        ],
    },


    {
        title: "Fashion Design - Textiles & Garment Manufacturing",
        overview:
            "The Fashion Design program at the Enock Addico Young Women Technical and Vocational Institute (EAYWTVI) empowers young women with the creative and technical skills needed to excel in the fashion industry. This training focuses on Textiles & Garment Manufacturing, equipping participants with hands-on experience in design, fabric selection, pattern-making, sewing, and finishing techniques. Participants will learn how to create unique clothing designs, master tailoring and embroidery, and understand the business side of fashion, including branding, pricing, and marketing strategies. The program also integrates sustainable fashion practices, promoting eco-friendly materials and ethical production methods. Through practical workshops, mentorship, and access to business incubation support, graduates will be prepared for careers as fashion entrepreneurs, designers, tailors, or textile manufacturers, helping them achieve financial independence while contributing to the local and global fashion industry.",
        image: fas.src,
        heroImage:fashero.src,
        softSkills: ["Communication Skills", "Teamwork & Collaboration ", "Problem-Solving Skills", "Adaptability & Flexibility", "Emotional Intelligence"],
        industrySkills: [
            "Garment construction and tailoring techniques — teaching young women how to design, cut, sew, and finish high-quality clothing.",
             "Pattern-making and fabric selection — enabling them to create customized, stylish, and well-fitting designs from scratch.", 
             "Embroidery and creative design skills — adding unique artistic touches that elevate clothing and accessories.",
             "Fashion business and branding strategies — preparing them to price, package, and market their products confidently in the fashion market."
        ],
        specialFeatures: [
            {
                heading: "Career Counseling: ",
                subheading: "We offer personalized guidance to help students identify their career goals, refine their resumes, and prepare for interviews. We assist students in strategizing their job search and connecting them with potential clients or employers.",
              },
              {
                heading: "Workshops and Seminars: ",
                subheading: "Regular workshops on topics such as personal branding, pitching to clients, and financial management for freelancers are offered. These sessions help students build confidence and competence in managing their freelance careers.",
              },
              {
                heading: "Internship Opportunities: ",
                subheading: "We facilitate internship placements with partner businesses and organizations, allowing students to gain real-world experience and establish professional networks before graduation.",
              },
        ],
        gain: [
            "It’s free-of-charge! Beneficiaries gain all the skills they need to launch a career in Cosmetology, at no cost.",
            "Beneficiaries grow in confidence and resilience, while building their first professional network in the training room.",
            "Dedicated mentor support during the program and afterwards to give women the best chance of succeeding and overcoming any challenges.",
            "Post-graduate support through seed funding and expert guidance to help women turn their skills into successful businesses.",
        ],
        partners: ["Ga Mantse Foundation", "Royal Africa Generational Thinkers", "Eccentric Clothing"],
        partnerLogo: [
          mantse.src,
          raget.src,
          // eccentric.src

        ],
        gallery: [
fas1.src,
fas2.src,
fas3.src,
fas4.src,
        ],
    },

    {
        title: "ICT - Web Development and Digital Marketing",
        overview:
            "The Web Development, Digital Marketing, and ICT program equips young women with essential digital skills to thrive in the modern workforce. Through hands-on projects, students learn web development, SEO, social media marketing, and basic IT skills. The program is designed in collaboration with industry partners to ensure relevance and includes mentorship to help students build portfolios and secure jobs in tech or marketing fields.",
        image: dev.src,
        heroImage:dev.src,
        softSkills: ["Communication Skills", "Teamwork & Collaboration ", "Problem-Solving Skills", "Adaptability & Flexibility", "Emotional Intelligence"],
        industrySkills: [
          "Website design and development skills — enabling them to create, manage, and maintain functional and responsive websites.",
           "Coding and programming knowledge — teaching essential languages like HTML, JavaScript, and Python to build apps and digital solutions.", 
           "Digital marketing and online strategy skills — equipping them to promote brands, manage social media, and run effective online campaigns."],
        specialFeatures: [
            {
                heading: "Career Counseling: ",
                subheading: "We offer personalized guidance to help students identify their career goals, refine their resumes, and prepare for interviews. We assist students in strategizing their job search and connecting them with potential clients or employers.",
              },
              {
                heading: "Workshops and Seminars: ",
                subheading: "Regular workshops on topics such as personal branding, pitching to clients, and financial management for freelancers are offered. These sessions help students build confidence and competence in managing their freelance careers.",
              },
              {
                heading: "Internship Opportunities: ",
                subheading: "We facilitate internship placements with partner businesses and organizations, allowing students to gain real-world experience and establish professional networks before graduation.",
              },
        ],
        gain: [
            "It’s free-of-charge! Beneficiaries gain all the skills they need to launch a career in Cosmetology, at no cost.",
            "Beneficiaries grow in confidence and resilience, while building their first professional network in the training room.",
            "Dedicated mentor support during the program and afterwards to give women the best chance of succeeding and overcoming any challenges.",
            "Post-graduate support through seed funding and expert guidance to help women turn their skills into successful businesses.",
        ],        
        partners: ["Ga Mantse Foundation", "Royal Africa Generational Thinkers"],
        partnerLogo: [
          mantse.src,
          raget.src
        ],
        gallery: [

        ],
    },
];