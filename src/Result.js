export default function Result(props) {
    return (
      <>
        <center>
          <h2>{props.title}</h2>
          <a href={props.url} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
          <hr />
        </center>
      </>
    );
  }
  