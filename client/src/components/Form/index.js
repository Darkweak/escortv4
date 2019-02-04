import React from 'react';
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

export const Form = ({fields, history, identifier, handleSubmit, redirect}) => (
  <BForm onSubmit={event => {event.preventDefault(); handleSubmit(event.target.elements)}} id={identifier}>
    {
      fields.map((field, index) => (
        <FormGroup key={index}>
          <Label for={slugify(field.label)}>{field.label}</Label>
          <Input type={field.type} name={slugify(field.label)} id={slugify(field.label)} placeholder={field.placeholder} />
        </FormGroup>
      ))
    }
    <Container className={'text-center'}>
      <Button type={'submit'} className={'primary'}>Submit</Button>
    </Container>
    {
      redirect && (
        <div className={'pt-1 pb-1 text-center'} onClick={() => redirectTo(history, redirect.to)}>
          <span className={'redirect'}>{redirect.label}</span>
        </div>
      )
    }
  </BForm>
)
