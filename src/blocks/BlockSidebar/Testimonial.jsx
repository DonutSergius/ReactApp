import React from 'react';
import Service from "../../services/Service";
import {stripHtmlTags} from "../../utils/dataProcessor";
import Feedback from "../../components/Feedback";

/**
 * Class component Testimonial that displays a list of archived articles.
 *
 * @extends React.Component
 */
class Testimonial extends React.Component {

    /**
     * Initializes the component and sets the initial state.
     *
     * @param {Object} props - The component's props.
     */
    constructor(props) {
        super(props);
        this.state = {
            feedbacks: [],
        };
    }

    /**
     * Called immediately after the component is mounted.
     * Fetches the archive data and updates the component state.
     */
    async componentDidMount() {
        const response = await Service.getTestimonials();
        const responseTitles = response.map(item => ({
            body: stripHtmlTags(item.body),
            imageUrl: Service.getImage(item.field_image_1),
        }));
        const trimmedResponse = response.slice(1);

        const feedbacks = trimmedResponse.map((item, index) => ({
            feedbackRemeber: `@${item.field_remember}`,
            feedbackBody: responseTitles[index + 1].body,
            feedbackImageUrl: responseTitles[index + 1].imageUrl,
        }));

        this.setState({feedbacks});
    }

    /**
     * Renders the component.
     *
     * @returns {JSX.Element} - The rendered component.
     */
    render() {
        const {feedbacks} = this.state;
        const blockTitle = "Testimonial";

        return (
            <div className="testimonial-container row">
                <div className="testimonial-title"> {blockTitle} </div>
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
    }
}

export default Testimonial;