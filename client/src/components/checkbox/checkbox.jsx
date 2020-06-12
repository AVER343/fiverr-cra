import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class CustomCheckBox extends React.Component {
    render() {
        return (
            <Formik
                initialValues={{
                    acceptTerms: false
                }}
                validationSchema={Yup.object().shape({
                    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required')
                })}
                onSubmit={fields => {
                    console.log("Agreed to terms and conditions !")
                }}
            >
                {({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group form-check">
                            <div type="submit"><Field type="checkbox" name="acceptTerms" id="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} /></div>
                            <label htmlFor="acceptTerms" className="form-check-label">Accept Terms & Conditions</label>
                            <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
                        </div>
                    </Form>
                )}
            </Formik>
        )
    }
}
 export default CustomCheckBox