import React, {useState, useEffect} from 'react';
import Service from "../../services/Service";
import {stripHtmlTags} from "../../utils/dataProcessor";
import Feedback from "../../components/Feedback";

/**
 * Functional component Testimonial that displays a list of feedback.
 *
 * @returns {JSX.Element} - The rendered component.
 */
const Testimonial = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            const response = await Service.getTestimonials();
            const responseTitles = response.map(item => ({
                body: stripHtmlTags(item.body),
                imageUrl: Service.getImage(item.field_image_1),
            }));
            const trimmedResponse = response.slice(1);

            const feedbacksData = trimmedResponse.map((item, index) => ({
                feedbackRemeber: `@${item.field_remember}`,
                feedbackBody: responseTitles[index + 1].body,
                feedbackImageUrl: responseTitles[index + 1].imageUrl,
            }));

            setFeedbacks(feedbacksData);
        };

        fetchTestimonials();
    }, []);

    const blockTitle = "Testimonial";

    return (
        <div className="testimonial-container row">
            <div className="testimonial-title">{blockTitle}</div>
            <div className="testimonial-feedbacks">
                {feedbacks.slice().reverse().map((feedback, index) => (
                    <Feedback
                        key={index}
                        imageUrl={feedback.feedbackImageUrl}
                        imageAlt={feedback.feedbackRemeber}
                        feedbackRemember={feedback.feedbackRemeber}
                        feedbackBody={feedback.feedbackBody}
                    />
                ))}
            </div>
        </div>
    );
};

export default Testimonial;
