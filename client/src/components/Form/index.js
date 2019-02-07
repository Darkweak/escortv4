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

const mapStateToProps = ({formReducer: {is_fetching}}) => ({
  is_fetching,
});

export const Form = connect(
  mapStateToProps,
  {}
)(({button_list, fields, history, handleSubmit, identifier, is_fetching, redirect}) => (
  <BForm onSubmit={event => {event.preventDefault(); handleSubmit(event.target.elements)}} id={identifier}>
    {
      fields.map((field, index) => (
        <FormGroup key={index}>
          <Label for={slugify(field.label)}>{field.label}</Label>
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
        </FormGroup>
      ))
    }
    <Container className={'text-center'}>
      <Button type={'submit'} className={'primary'} disabled={is_fetching}>Submit</Button>
    </Container>
    {
      redirect && (
        <div className={'pt-1 pb-1 text-center'} onClick={() => redirectTo(history, redirect.to)}>
          <span className={'redirect'}>{redirect.label}</span>
        </div>
      )
    }
  </BForm>
));
