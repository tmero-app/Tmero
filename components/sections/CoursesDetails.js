import Link from 'next/link';
import React from 'react';
import Accordion from '../elements/Accordion';


const Courseone = ({ alternate }) => {
	return (
		<>

			<section className="course-details">
				<div className="container">
					<div className="row flex-xl-row-reverse">
						<div className="col-xl-8 col-lg-8">
							<div className="courses-details__content">

								<img src="images/resource/course-details.jpg" alt="" />
								<h2 className="mt-4">Course Overview</h2>
								<p>At TMERO.com, we believe in nurturing confident and well-rounded learners through the power of language. Our courses are thoughtfully designed for young minds to explore languages like Afaan Oromo, Somali, Tigrigna, and Amharic through fun and engaging lessons.</p>
								<p>In addition to building language proficiency, students will cultivate essential qualities such as curiosity, resilience, and cultural awareness. With our unique approach, your child will not only learn to communicate effectively but also develop the skills and mindset needed to thrive with self-confidence.</p>
								<div className="content mt-40">
									<div className="text">
										<h3>What You Will Learn?</h3>
										<p>Develop language skills, build confidence, and apply your knowledge in real-life situations for meaningful connections.</p>
									</div>
									<div className="row mt-30">

										<div className="category-block-current-two col-lg-4 col-md-6 col-sm-6">
											<div className="inner-box">
												<div className="icon-box">
													<i className="icon flaticon-elearning"></i>
												</div>
												<h4 className="title">Language for Life</h4>
												<span className="sub-title">4 Courses</span>
											</div>
										</div>

										<div className="category-block-current-two col-lg-4 col-md-6 col-sm-6">
											<div className="inner-box">
												<div className="icon-box">
													<i className="icon flaticon-study-1"></i>
												</div>
												<h4 className="title">Build Character</h4>
												<span className="sub-title">4 Courses</span>
											</div>
										</div>

										<div className="category-block-current-two col-lg-4 col-md-6 col-sm-6">
											<div className="inner-box">
												<div className="icon-box">
													<i className="icon flaticon-study"></i>
												</div>
												<h4 className="title">Real-Life Application</h4>
												<span className="sub-title">4 Courses</span>
											</div>
										</div>
									</div>
								</div>


								<div className="mt-25">
									<h3>Frequently Asked Question</h3>
									<p>At TMERO.com, we understand that you may have questions about our programs and how they can benefit your child. Below, you'll find answers to the most common inquiries, designed to help you make an informed decision about your child's language learning journey.</p>

									<Accordion/>
								</div>



							</div>
						</div>

					</div>
				</div>
			</section>

		</>
	);
};

export default Courseone;