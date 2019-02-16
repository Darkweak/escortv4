import React, {Fragment} from 'react';
import {Layout} from "../Layout";

const website = 'eScort-me.online';

const items = [
  {
    title: `Objet`,
    description: `Les présentes « conditions générales d'utilisation » ont pour objet l'encadrement juridique des modalités de mise à disposition des services du site ${website} et leur utilisation par « l'Utilisateur ».
Les conditions générales d'utilisation doivent être acceptées par tout Utilisateur souhaitant accéder au site. Elles constituent le contrat entre le site et l'Utilisateur. L’accès au site par l’Utilisateur signifie son acceptation des présentes conditions générales d’utilisation.
Éventuellement :
En cas de non-acceptation des conditions générales d'utilisation stipulées dans le présent contrat, l'Utilisateur se doit de renoncer à l'accès des services proposés par le site.
${website} se réserve le droit de modifier unilatéralement et à tout moment le contenu des présentes conditions générales d'utilisation.`
  },
  {
    title: `Définitions`,
    description: `La présente clause a pour objet de définir les différents termes essentiels du contrat :
Utilisateur : ce terme désigne toute personne qui utilise le site ou l'un des services proposés par le site.
Contenu utilisateur : ce sont les données transmises par l'Utilisateur au sein du site.
Membre : l'Utilisateur devient membre lorsqu'il est identifié sur le site.
Identifiant et mot de passe : c'est l'ensemble des informations nécessaires à l'identification d'un Utilisateur sur le site. L'identifiant et le mot de passe permettent à l'Utilisateur d'accéder à des services réservés aux membres du site. Le mot de passe est confidentiel.`
  },
  {
    title: `Propriété intellectuelle`,
    description: `Les marques, logos, signes et tout autre contenu du site font l'objet d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.
L'Utilisateur sollicite l'autorisation préalable du site pour toute reproduction, publication, copie des différents contenus.
L'Utilisateur s'engage à une utilisation des contenus du site dans un cadre strictement privé. Une utilisation des contenus à des fins commerciales est strictement interdite.
Tout contenu mis en ligne par l'Utilisateur est de sa seule responsabilité. L'Utilisateur s'engage à ne pas mettre en ligne de contenus pouvant porter atteinte aux intérêts de tierces personnes. Tout recours en justice engagé par un tiers lésé contre le site sera pris en charge par l'Utilisateur.
Le contenu de l'Utilisateur peut être à tout moment et pour n'importe quelle raison supprimé ou modifié par le site. L'Utilisateur ne reçoit aucune justification et notification préalablement à la suppression ou à la modification du contenu Utilisateur.`
  },
  {
    title: `Données personnelles`,
    description: `Les informations demandées à l’inscription au site sont nécessaires et obligatoires pour la création du compte de l'Utilisateur. En particulier, l'adresse électronique pourra être utilisée par le site pour l'administration, la gestion et l'animation du service.
Le site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés.
En vertu des articles 39 et 40 de la loi en date du 6 janvier 1978, l'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données personnelles. L'Utilisateur exerce ce droit via :
son espace personnel`
  },
  {
    title: `Responsabilité et force majeure`,
    description: `Les sources des informations diffusées sur le site sont réputées fiables. Toutefois, le site se réserve la faculté d'une non-garantie de la fiabilité des sources. Les informations données sur le site le sont à titre purement informatif. Ainsi, l'Utilisateur assume seul l'entière responsabilité de l'utilisation des informations et contenus du présent site.
L'Utilisateur s'assure de garder son mot de passe secret. Toute divulgation du mot de passe, quelle que soit sa forme, est interdite.
L'Utilisateur assume les risques liés à l'utilisation de son identifiant et mot de passe. Le site décline toute responsabilité.
Tout usage du service par l'Utilisateur ayant directement ou indirectement pour conséquence des dommages doit faire l'objet d'une indemnisation au profit du site.
Le site ${website} s'engage à mettre en œuvre tous les moyens nécessaires afin de garantir au mieux la sécurité et la confidentialité des données.
La responsabilité du site ne peut être engagée en cas de force majeure ou du fait imprévisible et insurmontable d'un tiers.`
  },
  {
    title: `Évolution du contrat`,
    description: `Le site se réserve à tout moment le droit de modifier les clauses stipulées dans le présent contrat.`
  },
  {
    title: `Durée`,
    description: `La durée du présent contrat est indéterminée. Le contrat produit ses effets à l'égard de l'Utilisateur à compter de l'utilisation du service.`
  }
];

export const CGU = ({...rest}) => (
  <Layout defaultContainer {...rest}>
    <div className={'pt-4 pb-4'}>
      <h1 className={'text-center'}>Conditions générales d'utilisation</h1>
      <div className={'pt-4'}>
        {
          items.map((item, index) => (
            <div className={'pt-2 pb-2'} key={index}>
              <h3 className={'title-cgu'}>Article {`${index+1} : ${item.title}`}</h3>
              <p>{item.description}</p>
            </div>
          ))
        }
      </div>
    </div>
  </Layout>
)
