import React from 'react';
import axios from 'axios';
import DetailForms from './DetailForms.js';
import DetailViews from './DetailViews.js';

export default class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      number: 1,
      newComment: '',
      comments: [],
    };
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.current !== this.props.current) {
      axios.get(`/comments/${this.props.current}`).then((results) => {
        console.log('results.data a :' + results.data);
        let finalComments = [];
        for (let i = 0; i < results.data.length; i++) {
          if (results.data[i].breed === this.props.current) {
            console.log(results.data[i].text);
            finalComments.push(results.data[i].text);
          }
        }
        // forEach로 바꾼 것:
        // results.data.forEach(resultData => {
        //     if(resultData.breed === this.props.current)   {
        //         console.log(resultData[i].text)
        //         finalComments.push(resultData[i].text)
        //     }
        // })
        this.setState({
          comments: finalComments,
        });
      });

      axios
        .get(`https://dog.ceo/api/breed/${this.props.current}/images`)
        .then((results) => {
          this.setState({
            images: results.data.message,
          });
        })
        .catch((error) => console.log(error));
    }
  }

  handleNumberChange(event) {
    this.setState({
      number: event.target.value,
    });
  }

  handleCommentChange(event) {
    this.setState({
      newComment: event.target.value,
    });
  }

  handleCommentSubmit(event) {
    event.preventDefault();
    let date = new Date();
    let time = new Date();
    date = date.toLocaleDateString();
    time = time.toLocaleTimeString();
    let cloneComments = this.state.comments.slice(); //comments: 현재 comment
    let tempComments =
      'Comment: ' + this.state.newComment + ' (' + date + ' ' + time + ')';
    cloneComments.push(tempComments); //clone에 새로 들어온 것 복사
    this.setState({
      comments: cloneComments,
      newComment: '',
    });

    axios
      .post('/comments', {
        breed: this.props.current,
        text: this.state.newComment.toString(),
      })
      .then((results) => {
        console.log('breed: ' + this.props.current);
        console.log('text: ' + this.state.newComment.toString());
        console.log('here: ' + results.data);
      })
      .catch((error) => console.log(error));
  }

  render() {
    let formProps = {
      handleCommentSubmit: this.handleCommentSubmit,
      handleCommentChange: this.handleCommentChange,
      handleNumberChange: this.handleNumberChange,
      images: this.state.images,
      number: this.state.number,
      newComment: this.state.newComment,
      comments: this.state.comments,
      current: this.props.current,
    };

    return (
      <>
        <div className="details">
          <DetailViews formProps={formProps} />
          <DetailForms formProps={formProps} />
        </div>
      </>
    );
  }
}
