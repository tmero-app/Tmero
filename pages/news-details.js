import { useRouter } from "next/router";
import React from 'react';
import Layout from "../components/layout/Layout";
import PageTitle from "../components/sections/PageTitle";
import BlogDetails from "../components/sections/BlogDetails";

const POSTS = [
    {
      id: "blog-1",
      title: "Amharic Testimonials: Reconnecting Through Language",
      description: "Heartfelt testimonials from families who rediscovered their bonds by speaking Amharic together—powered by Tmero.",
      videoUrl: "https://www.youtube.com/embed/cU8ZcWKuOHo", 
      comments: [
        { 
          name: "Alemu Desta (Father of 2)", 
          text: "We started speaking Amharic during dinner. Tmero helped us reconnect not just with the language, but with each other." 
        },
        { 
          name: "Selamawit Taye (Mom from DMV)", 
          text: "My daughter now surprises me with phrases in Amharic. It's like watching a piece of our home come alive in her." 
        }
      ],
      tags: ["Amharic"]
    },
    {
      id: "blog-2",
      title: "Afaan Oromo Testimonials: Healing Bonds Through Words",
      description: "Powerful stories from parents whose children revive family ties by speaking Afaan Oromo at home.",
      videoUrl: "https://www.youtube.com/embed/cU8ZcWKuOHo", 
      comments: [
        {
          name: "Jemal Yusuf (Father of 3)",
          text: "Hearing my son greet me in Afaan Oromo brought tears to my eyes. Tmero helped us rebuild that father-son bond through language."
        },
        {
          name: "Aisha Kedir (Mom from Minnesota)",
          text: "Tmero brought my roots back into our home. My kids now say, “Siin jaaladha, Umma!”—and I felt so good, like a part of me came alive again."
        }
      ],
      tags: ["Afaan Oromo"]
    },
    {
      id: "blog-3",
      title: "Somali Testimonials: Speaking From the Heart",
      description: "Real-life accounts of Somali families healing and growing closer by reclaiming their mother tongue.",
      videoUrl: "https://www.youtube.com/embed/cU8ZcWKuOHo", 
      comments: [
        {
          name: "Samiya Bashir (Mom from Minneapolis)",
          text: "It’s more than just learning—it’s healing. My daughter now asks me questions in Somali. We’re finally speaking from the heart."
        },
        {
          name: "Nimco Warsame (Proud Somali Mom)",
          text: "My children now respond to me in Somali—and not just words, but feelings. We laugh and have genuine conversations."
        }
      ],
      tags: ["Somali"]
    },
    {
      id: "blog-4",
      title: "Tigrigna Testimonials: Culture Alive at Home",
      description: "Uplifting stories of Tigrigna-speaking families who brought their heritage back to life with Tmero.",
      videoUrl: "https://www.youtube.com/embed/cU8ZcWKuOHo", 
      comments: [
        {
          name: "Tigist Bekele (Proud Eritrean Mom)",
          text: "My son started calling me “Eddaye” again. That one word brought our entire culture into our home. Thank you, Tmero.com"
        },
        {
          name: "Senait Hagos (Proud Tigrayan Mom)",
          text: "Hearing my daughter say “Kemey aleki, Adey” melted my heart. Tigrigna is now a living part of our home again."
        }
      ],
      tags: ["Tigrigna"]
    }
  ];
  
  
export default function Home() {
  const { query } = useRouter();
  const post = POSTS.find((p) => p.id === query.id) || POSTS[0];

    return (
        <>
            <Layout HeaderStyle="one">
                <PageTitle pageName="Blog Details" />
                <BlogDetails blogData={post} />
            </Layout>
        </>
    )
}
