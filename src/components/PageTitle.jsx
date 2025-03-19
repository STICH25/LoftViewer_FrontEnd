import "../assets/css/textWithShadow.css";

const PageTitle = ({ word }) => {
  const CreateTitle = (word) => {
    return word
      .split("")
      .map((letter, index) => <span key={index}>{letter}</span>);
  };

  return (
    <h1 className="shadows">
      <span>{CreateTitle(word)}</span>
    </h1>
  );
};

export default PageTitle;
