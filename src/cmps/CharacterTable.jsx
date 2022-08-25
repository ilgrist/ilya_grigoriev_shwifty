export const CharacterTable = ({ character, title }) => {
  const { name, origin, dimension, popularity } = character;
  return (
    <table className="character-table">
      <caption className="title">{title}</caption>
      <tbody>
        <tr>
          <td>Character name</td>
          <td>{name}</td>
        </tr>
        <tr>
          <td>Origin name</td>
          <td>{origin}</td>
        </tr>
        <tr>
          <td>Origin dimension</td>
          <td>{dimension}</td>
        </tr>
        <tr>
          <td>Popularity</td>
          <td>{popularity}</td>
        </tr>
      </tbody>
    </table>
  );
};
