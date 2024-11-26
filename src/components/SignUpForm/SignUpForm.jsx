// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as yup from 'yup';
// import { useDispatch } from 'react-redux';
// import { register } from '../../redux/user/operations';
// import css from './SignUpForm.module.css';
// import eye from '../../shared/Icons/eye.svg';
// import eyeOff from '../../shared/Icons/eyeOff.svg';
// import { toast } from 'react-toastify';

// const signUpValidationSchema = yup.object().shape({
//   email: yup.string().email('Invalid email format').required('Email is required'),
//   password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//   repeatPassword: yup
//     .string()
//     .oneOf([yup.ref('password'), null], 'Passwords must match')
//     .required('Repeat Password is required'),
// });

// const SignUpForm = () => {
//   const dispatch = useDispatch();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showRepeatPassword, setShowRepeatPassword] = useState(false);

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);
//   const toggleRepeatPasswordVisibility = () => setShowRepeatPassword(!showRepeatPassword);

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       await dispatch(register(values)).unwrap();
//       toast.success('Registration successful!');
//     } catch (error) {
//       toast.error(error.customMessage || 'Failed to register. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Formik
//       initialValues={{ email: '', password: '', repeatPassword: '' }}
//       validationSchema={signUpValidationSchema}
//       onSubmit={handleSubmit}
//     >
//       {({ isSubmitting, errors, touched, setFieldTouched, isValid }) => (
//         <Form className={css.form}>
//           <div className={css.cntInpit}>
//             <label className={css.label}>
//               <span className={css.labelText}>Email</span>
//               <Field
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 className={`${css.input} ${errors.email && touched.email ? css.errorInput : ''}`}
//                 onBlur={() => setFieldTouched('email', true)}
//               />
//               <ErrorMessage name="email" component="span" className={css.error} />
//             </label>
//             <label className={css.label}>
//               <span className={css.labelText}>Password</span>
//               <div className={css.passwordField}>
//                 <Field
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   placeholder="Enter your password"
//                   className={`${css.input} ${errors.password && touched.password ? css.errorInput : ''}`}
//                   onBlur={() => setFieldTouched('password', true)}
//                 />
//                 <button type="button" className={css.iconButton} onClick={togglePasswordVisibility}>
//                   <img src={showPassword ? eye : eyeOff} alt="Toggle password visibility" className={css.icon} />
//                 </button>
//               </div>
//               <ErrorMessage name="password" component="span" className={css.error} />
//             </label>
//             <label className={css.label}>
//               <span className={css.labelText}>Repeat Password</span>
//               <div className={css.passwordField}>
//                 <Field
//                   type={showRepeatPassword ? 'text' : 'password'}
//                   name="repeatPassword"
//                   placeholder="Repeat your password"
//                   className={`${css.input} ${errors.repeatPassword && touched.repeatPassword ? css.errorInput : ''}`}
//                   onBlur={() => setFieldTouched('repeatPassword', true)}
//                 />
//                 <button type="button" className={css.iconButton} onClick={toggleRepeatPasswordVisibility}>
//                   <img src={showRepeatPassword ? eye : eyeOff} alt="Toggle repeat password visibility" className={css.icon} />
//                 </button>
//               </div>
//               <ErrorMessage name="repeatPassword" component="span" className={css.error} />
//             </label>
//           </div>
//           <button type="submit" className={css.button} disabled={isSubmitting || !isValid}>
//             {isSubmitting ? 'Signing Up...' : 'Sign Up'}
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default SignUpForm;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { register } from '../../redux/user/operations';
import css from './SignUpForm.module.css';
import eye from '../../shared/Icons/eye.svg';
import eyeOff from '../../shared/Icons/eyeOff.svg';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Repeat Password is required'),
});

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(register(data)).unwrap();
      toast.success('Registration successful!');
      navigate('/tracker'); // Перенаправлення на TrackerPage
    } catch (error) {
      toast.error(error.customMessage || 'Registration failed. Please try again.');
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)} disabled={isSubmitting}>
      <div className={css.cntInpit}>
        <label className={css.label}>
          <span className={css.labelText}>Email</span>
          <input
            type="email"
            placeholder="Enter your email"
            className={`${css.input} ${errors.email ? css.errorInput : ''}`}
            {...formRegister('email')}
          />
          {errors.email && <span className={css.error}>{errors.email.message}</span>}
        </label>
        <label className={css.label}>
          <span className={css.labelText}>Password</span>
          <div className={css.passwordField}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className={`${css.input} ${errors.password ? css.errorInput : ''}`}
              {...formRegister('password')}
            />
            <button type="button" className={css.iconButton} onClick={() => setShowPassword(!showPassword)}>
              <img src={showPassword ? eye : eyeOff} alt="Toggle password visibility" className={css.icon} />
            </button>
          </div>
          {errors.password && <span className={css.error}>{errors.password.message}</span>}
        </label>
        <label className={css.label}>
          <span className={css.labelText}>Repeat Password</span>
          <div className={css.passwordField}>
            <input
              type={showRepeatPassword ? 'text' : 'password'}
              placeholder="Repeat your password"
              className={`${css.input} ${errors.repeatPassword ? css.errorInput : ''}`}
              {...formRegister('repeatPassword')}
            />
            <button type="button" className={css.iconButton} onClick={() => setShowRepeatPassword(!showRepeatPassword)}>
              <img src={showRepeatPassword ? eye : eyeOff} alt="Toggle repeat password visibility" className={css.icon} />
            </button>
          </div>
          {errors.repeatPassword && <span className={css.error}>{errors.repeatPassword.message}</span>}
        </label>
      </div>
      <button type="submit" className={css.button} disabled={isSubmitting}>
        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignUpForm;
