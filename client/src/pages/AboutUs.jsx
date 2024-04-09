import React from 'react';
import { FaQuoteRight } from 'react-icons/fa';
import Layout from '../components/Layout/Layout';

const testimonials = [{
  username: 'Ben Parker',
  position: 'CEO',
  company: 'Foodtesla',
  image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80',
  content: `Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper`
}];

export default function AboutUs() {
  return (
    <Layout>
      <div style={{ textAlign: 'center', marginTop: '140px' }}>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
        <p style={{color:'lightblue'}}>Welcome to our innovative job seeker platform! At Your Company, we're dedicated to simplifying your job search and connecting you with exciting career opportunities that match your skills and preferences. Whether you're a recent graduate exploring entry-level positions or an experienced professional looking for your next challenge, we've got you covered.

Discover personalized job recommendations tailored to your profile, browse diverse listings across various industries and locations, and receive timely job alerts straight to your inbox. Our platform offers more than just job listings – take advantage of resume reviews, interview preparation tips, and career guidance from industry experts to enhance your chances of success.

Join thousands of satisfied users who have found their dream jobs through our platform. We're committed to your career growth and success. Start exploring today and take the next step towards achieving your professional goals!

For any inquiries or assistance, feel free to contact our friendly support team at support@example.com. We're here to help you succeed!</p>

        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h3 style={{color:'white', fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>Testimonials</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '20px', padding: '20px' }}>
        {testimonials.map((testimonial, index) => (
          <div key={index} style={{ maxWidth: '25rem', margin: '0 auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', borderTop: '2px solid #38a169' }}>
              <FaQuoteRight style={{ width: '40px', height: '40px', color: '#38a169' }} />
              <p style={{ color: '#718096', fontSize: '1.1rem', lineHeight: '1.6', marginTop: '20px' }}>{testimonial.content}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                <img src={testimonial.image} alt="avatar" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginRight: '10px' }} />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '5px' }}>{testimonial.username}</p>
                  <p style={{ color: '#718096', fontSize: '1rem' }}>{testimonial.position} at {testimonial.company}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
