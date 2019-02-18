import React, {Fragment} from 'react';
import {Layout} from "../Layout";
import './cashback.css';

const cashback = [
  {
    scenario: 'Prenons Bob qui est le premier donateur. Bob choisit de donner 5€, l\'application possède 50% des parts, et Bob obtient les 50% restants à hauteur de 5€. Lors du premier don, la donateur n\'obtient pas de cashback étant donné qu\'il n\'avait pas de parts avant le dit don',
    chart: 'first',
    beforeGift: [
      {
        name: 'eScort',
        value: '0€',
      },
      {
        name: 'Bob',
        value: '5€',
      },
    ],
    afterGift: [
      {
        name: 'eScort',
        value: 5,
      },
      {
        name: 'Bob',
        value: 0,
      },
    ]
  },
  {
    scenario: 'Après le don de Bob, Alice se décide elle aussi œuvrer pour le développement de l\'application et choisit de donner 10€, alors Bob qui a 50% des parts reçoit 5€ (50% de 10€) et eScort reçoit 5€ aussi.',
    chart: 'second',
    beforeGift: [
      {
        name: 'eScort',
        value: 5,
      },
      {
        name: 'Bob',
        value: 0,
      },
      {
        name: 'Alice',
        value: 10,
      },
    ],
    afterGift: [
      {
        name: 'eScort',
        value: 10,
      },
      {
        name: 'Bob',
        value: 5,
      },
      {
        name: 'Alice',
        value: 0,
      },
    ]
  },
];

const GenerateCashBackChart = ({item}) => (
  <Fragment>
    <div className={'pt-3 pb-3'}>
      {item.scenario}
    </div>
    <div className={'pt-3 pb-3'}>
      <span className={'d-block'}>
        <span>Avant le don nous avions :</span>
        <ul className={'list-unstyled'}>
          {
            item.beforeGift.map((i, index) => (
              <li className={`color-${i.name}`} key={index}>{`${i.name} : ${i.value}€`}</li>
            ))
          }
        </ul>
      </span>
      <span className={'d-block'}>
        De ce fait après le précédent don nous obtenons ce graphique et les résultats suivants :
      </span>
    </div>
    <div className={'pt-3 d-flex'}>
      <div className={'m-auto'}>
        <div className={`chart ${item.chart}-chart-escort`}></div>
        <div className={`chart ${item.chart}-chart-bob`}></div>
      </div>
    </div>
    <ul className={'pb-3 list-unstyled'}>
      {
        item.afterGift.map((i, index) => (
          <li className={`color-${i.name}`} key={index}>{`${i.name} : ${i.value}€`}</li>
        ))
      }
    </ul>
  </Fragment>
);

export const Cashback = ({...rest}) => (
  <Layout defaultContainer padding {...rest}>
    <h1 className={'text-center pb-2'}>Le système de cashback</h1>
    <div className={'pt-3 pb-3'}>
      <span>
        Comme vous avez pu le lire sur la page d'accueil, l'application est gratuite mais vous permet de donner de l'argent pour soutenir
        le projet en échange de parts dans l'application. Le modèle économique repose sur donc sur la bonté des gens souhaitant œuvrer pour
        le développement de l'application. L'application possède 50% des parts, les 50% restants sont répartis entre les différents donateurs
        proportionnellement à leurs dons par rapport au total des dons. Voici donc comment sont répartis les différents dons :
      </span>
    </div>
    {
      cashback.map((cash, index) => (
        <GenerateCashBackChart key={index} item={cash}/>
      ))
    }
  </Layout>
);
