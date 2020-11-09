export class ShowingsForm extends Component {
    continue = e => {
      e.preventDefault();
      // PROCESS FORM //
      this.props.nextStep();
    };
  
    back = e => {
      e.preventDefault();
      this.props.prevStep();
    };

    // take given theater
    // take given movie
    // show available times/dates
    render() {

    }
}
    export default ShowingsForm