import React from 'react';
import {connect} from 'react-redux';
import {
  Button,
  Container,
  Form as BForm,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import {slugify} from "../../functions/slugify";
import {redirectTo} from "../../functions/redirect";
import {Loader} from "../Layout/Loader";
import {DatePicker} from "../Outing/DatePicker";
import '../Layout/css/main.css';

const mapStateToProps = ({formReducer: {is_fetching}}) => ({
  is_fetching,
});

export const Form = connect(
  mapStateToProps,
  {}
)(({button_list, fields, history, handleSubmit, identifier, is_fetching, redirect, redirect_list}) => (
  <BForm onSubmit={event => {event.preventDefault(); handleSubmit(event.target.elements)}} id={identifier}>
    {
      fields.map((field, index) => (
        <FormGroup key={index}>
          <Label for={slugify(field.label)}>{field.label}{!field.not_required && <span className={'required'}>*</span>}</Label>
          {
            'datetime' === field.type ?
              <DatePicker name={field.name ?
                field.name :
                slugify(field.label)
              }/> :
              <Input
                type={field.type}
                name={field.name ?
                  field.name :
                  slugify(field.label)
                }
                id={slugify(field.label)}
                placeholder={field.placeholder}
                disabled={field.disabled || is_fetching}
                pattern={field.pattern ? field.pattern : '.+'}
                title={`Le format doit être du type : ${field.placeholder}`}
                required={!field.not_required}
              />
          }
        </FormGroup>
      ))
    }
    <Container className={'text-center'}>
      <Button type={'submit'} className={'primary'} disabled={is_fetching}>{is_fetching ? <Loader/> : 'Valider'}</Button>
    </Container>
    {
      redirect && (
        <div className={'pt-1 pb-1 text-center'} onClick={() => redirectTo(history, redirect.to)}>
          <span className={'redirect'}>{redirect.label}</span>
        </div>
      )
    }
    {
      redirect_list && redirect_list.length && redirect_list.map((item, index) => (
        <div key={index} className={'pt-1 pb-1 text-center'} onClick={() => redirectTo(history, item.to)}>
          <span className={'redirect'}>{item.label}</span>
        </div>
        )
      )
    }
  </BForm>
));
