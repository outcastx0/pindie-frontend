import Styles from "./CardsListSection.module.css";
import { CardsList } from "./CardsList";
import { CardsSlider } from "./CardsSlider";

export const CardsListSection = (props) => {
  console.log(props.data);
  return (
    <section className={Styles["list-section"]}><h2 className={Styles['section__title']}>
      {props.title}
    </h2>
      {props.type === 'slider' ? <CardsSlider data={props.data} /> : <CardsList data={props.data} />}
    </section >
  );
};