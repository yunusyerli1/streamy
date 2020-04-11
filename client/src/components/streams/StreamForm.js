import React from 'react';
import {Field, reduxForm} from 'redux-form';


 class StreamForm extends React.Component {
     renderError({error, touched}){
         if(touched && error){
             return (
                <div className="ui error message">
                    <div className="header">{error}</div>    
                </div>
             );
         }
     }
     renderInput = ({input, label, meta}) => {
         const className = `field ${meta.error&&meta.touched ? 'error':''}`
         return (
             <div className={className}>
                 <label>{label}</label>
                 <input {...input} autoComplete="off"/>
                 {this.renderError(meta)}
             </div>
         
            );
          }
         /* renderInput(formProps){
            return  <input {...formProps.input} />;
             }
             //Redux formda uygulanabilir bir tarz. 
             //Tek tek key value eşleştirmeden toplu olarak hepsini birleştiriyor.
        */
         /* renderInput(formProps){
            return (
               <input
                   onChange={formProps.input.onChange}  
                   value={formProps.input.value}
               />
             ); }
             */
    onSubmit = (formValues/*event*/) => {
        //event.preventDefault(); //handleSubmit bizim için yapıyor bunu.
        //Redux form ile gereksiz hale getirilmiş.
        //Aslında onSubmite de gerek yok.ama handleSubmit içine callback yerleştirmek istersek boyle yapıcaz.
        this.props.onSubmit(formValues);
    }
    render() {
        
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label = "Enter Title"/>
                <Field 
                    name="description"
                    component={this.renderInput} 
                    label = "Enter Description"
                />
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = formValues =>{
    const errors={};
    if(!formValues.title){
        errors.title = 'You must enter a title';
    }
    if(!formValues.description){
        errors.description = 'You must enter a description';
    }
    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate:validate
})(StreamForm);
