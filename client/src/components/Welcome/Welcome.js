import React, {Fragment} from 'react';
import {Layout} from "../Layout";
import {OutingList} from "../Outing";
import {isLogged} from "../../functions/logged";
import {Carousel} from "../Carousel";
import {TextContainer} from "../Layout/TextContainer";
import {Button} from 'reactstrap';
import {redirectTo} from "../../functions/redirect";

const welcomeItems = [
  {
    icon: 'question-circle',
    title: `Qu'est ce que eScort ?`,
    description: `eScort est un service qui facilite la mise en relation de plusieurs personnes ou groupes de personnes. Grâce à cette application vous pourrez découvrir les sorties organisées autour de chez vous, et découvrir de nouvelles personnes. Vous êtes nouvel arrivant dans une ville et vous ne souhaitez pas passer votre temps libre seul, vous êtes sociable et adorez passer des moments en groupe avec de nouvelles personnes, alors cette application est faite pour vous`,
  },
  {
    icon: 'user-shield',
    title: `Votre anonymat avant tout`,
    description: `Nous ne stockons aucune donnée, si ce n'est juste votre email, votre nom d'utilisateur et votre mot de passe afin de pouvoir vous authentifier. Aucune donnée n'est revendue ni exploitée par notre service ou par un tiers, nous mettons votre anonymat sur un piédestal afin de réduire au maximum les apprioris sur les gens.`,
  },
  {
    icon: 'users',
    title: `Envie de rencontrer du monde ?`,
    description: `Rien de plus simple, il suffit de s'inscrire pour accéder aux sorties disponibles près de chez vous. Il ne vous reste plus qu'à nous rejoindre et poster ou rejoindre une sortie pour commencer l'aventure.`,
  },
  {
    icon: 'money-bill-alt',
    title: `Investissez et obtenez des royalties`,
    description: `L'application étant 100% gratuite, vous pouvez participer à son développement en effectuant des dons pour soutenir le projet, en échange vous obtenez un pourcentage de parts dans l'entreprise en fonction du total donné par tous les contributeurs. Plus vous donnez, plus vous obtenez de pourcentage de parts.`,
    learnMore: '/cashback'
  },
];

export const Welcome = ({fetch_outings_error, is_fetching_outings, outing_created_elements, outings_list,...rest}) => (
  <Layout defaultContainer={isLogged()} {...rest}>
    {
      isLogged() ?
        <div className={'pt-4 pb-4'}>
          <OutingList {...rest}/>
        </div>:
        <WelcomeDefault {...rest}/>
    }
  </Layout>
);

const WelcomeDefault = ({history}) => (
  <Fragment>
    <Carousel/>
    {
      welcomeItems.map((welcomeItem, index) => (
        <TextContainer key={index} reverse={index%2 === 1} content={welcomeItem} history={history}/>
      ))
    }
    <div className={`reverse bg-register-welcome text-center`}>
      <div className={'pt-5 pb-5 bg-opacity'}>
        <h1 className={'text-center pb-2'}>Commence l'aventure dès maintenant</h1>
        <Button className={'primary fsr-3 pl-4 pr-4'} onClick={() => redirectTo(history, '/register')}>Inscris-toi !</Button>
      </div>
    </div>
  </Fragment>
);
