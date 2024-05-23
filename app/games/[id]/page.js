'use client';
import Link from "next/link";
import Styles from './Game.module.css'
import { useEffect, useState } from "react";
import { getNormalizedGameDataById, isResponseOk, checkIfUserVoted } from "@/app/api/api-utils";
import { endpoints } from "@/app/api/config";
import { Preloader } from "@/app/components/Preloader/Preloader";
import { vote } from "@/app/api/api-utils";
import { useStore } from "@/app/store/app-store";

export default function GamePage(props) {
  const [game, setGame] = useState(null);
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [isVoted, setIsVoted] = useState(false);
  const authContext = useStore();

  useEffect(() => {
    async function fetchData() {
      const currentGame = await getNormalizedGameDataById(endpoints.games, props.params.id);
      isResponseOk(currentGame) ? setGame(currentGame) : setGame(null)
      setPreloaderVisible(false);
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (authContext.user && game) {
      setIsVoted(checkIfUserVoted(game, authContext.user.id) || checkIfUserVoted(game, authContext.user._id));
    } 
    else {
      setIsVoted(false);
    }
  }, [authContext.user, game]);

  const handleVote = async () => {
    const jwt = authContext.token;
    let usersIdArray = game.users.length ? game.users.map((user) => user.id) : [];
    usersIdArray.push(authContext.user._id);
    const response = await vote(`${endpoints.games}/${game.id}`, jwt, usersIdArray);
    if (isResponseOk(response)) {
      setGame(() => {
        return {
          ...game,
          users: [...game.users, authContext.user],
          users_permissions_users: [...game.users, authContext.user],
        };
      });
    }
  };

  return (
    game ? (
      <>
        <section className={Styles['game']}>
          <iframe className={Styles['game__iframe']} src={game.link}></iframe>
        </section>
        <section className={Styles['about']}>
          <h2 className={Styles['about__title']}>{game.title}</h2>
          <div className={Styles['about__content']}>
            <p className={Styles["about__description"]}>{game.description}</p>
            <div className={Styles["about__author"]}>
              <p>Автор: <span className={Styles["about__accent"]}>{game.developer}</span></p>
            </div>
          </div>
          <div className={Styles["about__vote"]}>
            <p className={Styles["about__vote-amount"]}>За игру уже проголосовали: <span className={Styles["about__accent"]}>{game.users.length}</span></p>
            <button disabled={!authContext.isAuth || isVoted} className={`button ${Styles["about__vote-button"]}`} onClick={handleVote}>
              {isVoted ? "Голос учтён" : "Голосовать"}
            </button>
          </div>
        </section>
      </>
    ) : preloaderVisible ? (
      <Preloader />
    ) : (
      <section className={Styles["pleaseStandBy"]}>
        <img src='https://avatars.dzeninfra.ru/get-zen_doc/3985649/pub_5f5b363ad5e15d30dea2826d_5f62054ed3d25d7745c314cd/scale_1200' alt='Something went wrong' />
        <div>
          <p>Такой игры у нас нет(. Попробуйте найти что-нибудь <Link href='/' className={Styles.Ref}>другое.</Link></p>
        </div>
      </section>
    )
  )
}