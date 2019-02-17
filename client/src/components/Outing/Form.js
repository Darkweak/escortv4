import React from 'react';
import {Form} from "../Form";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../Layout/css/main.css';
import {createOuting} from "./store/action";
import {DangerAlert, SuccessAlert} from "../Alerts";
import {connect} from 'react-redux';

const fields = [
  {
    label: 'Nom de la sortie',
    type: 'text',
    placeholder: 'Nom de la sortie',
    name: 'name',
  },
  {
    label: 'Adresse',
    type: 'text',
    placeholder: '7 rue Achille',
    name: 'street',
  },
  {
    label: 'Complément d\'adresse',
    type: 'text',
    placeholder: 'Appartement 2, en face de...',
    name: 'complementaryStreet',
    not_required: true
  },
  {
    label: 'code postal',
    type: 'text',
    placeholder: '75020',
    pattern: '[0-9]{5}',
    name: 'postcode',
  },
  {
    label: 'Ville',
    type: 'text',
    placeholder: 'Paris',
    name: 'city',
  },
  {
    label: 'Pays',
    type: 'text',
    placeholder: 'FRANCE',
    name: 'country',
    disabled: true,
  },
  {
    label: 'Date',
    type: 'datetime',
    placeholder: '01/01/2019 18:30',
  },
  {
    label: 'Description',
    type: 'textarea',
    placeholder: 'Décrivez votre sortie ici',
    not_required: true,
  },
];

const mapStateToProps = ({
                           outingReducer: {
                             outing_created,
                             outing_creation_error,
                             outing_creation_error_cause,
                           }
}) => ({
  outing_created,
  outing_creation_error,
  outing_creation_error_cause,
})

export const OutingForm = connect(
  mapStateToProps,
  dispatch => ({
    createOuting: (...args) => dispatch(createOuting(...args))
  })
)(({createOuting, outing_created, outing_creation_error, outing_creation_error_cause, ...rest}) => (
  <div className={'pt-4 pb-4'}>
    {
      outing_creation_error && outing_creation_error_cause && outing_creation_error_cause.length ?
        outing_creation_error_cause.map(cause => <DangerAlert content={cause.message}/>) : null
    }
    {
      outing_created ? <SuccessAlert content={'Votre sortie a bien été créée'}/> : null
    }
    <Form
      handleSubmit={(...args) => createOuting(...args)}
      identifier={'escort-outing'}
      fields={fields}
      {...rest}
    />
  </div>
));
