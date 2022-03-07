import Link from "next/link";
export default function _professionsList(props) {
  let list = props.professions_list.map((profession, i) => {
      console.log(profession.title);
    return (
      <option key={i} value={profession.title} />
    );
  });
  return <>{list}</>;
}
