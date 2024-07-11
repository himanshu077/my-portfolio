import contactSuccessImage from '../assets/Images/ContactSuccess.svg';
import Button from './ui/button';
import Icons from './ui/icons';
import Image from './ui/image';
import Input from './ui/input';
import Label from './ui/label';
import Textarea from './ui/textarea';
import { Caption, Heading } from '../components/ui/typography';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { contactSubmissionSchema } from '../lib/validations/contact-submission';
import { useContext ,useState} from 'react';
import { PortfolioContext } from '../context/protfolioContext';
import axios from 'axios';

function ContactForm() {
  const portfolioData = useContext(PortfolioContext);
  const data = portfolioData && portfolioData.website ? portfolioData.website : "";
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting , isValid },
    reset,
  } = useForm({
    resolver: zodResolver(contactSubmissionSchema),
    mode: 'onChange',
  });

  // const sendEmail = async () => {
  //   try {
  //     const payload = {
  //       "email": "himanshukumar077@gmail.com",
  //       "subject": "hello mail",
  //       "body": "test mail body"
  //     };
  
  //     const response = await fetch("https://my9h84b2f9.execute-api.ap-south-1.amazonaws.com/default/sendMail", {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(payload)
  //     });
  //     if (response.ok) {
  //       const responseData = await response.json();
  //       console.log(responseData);
  //     } else {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || 'Failed to send email');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

    const handleSubmitEmail = async (data) => {
      const payload = {
        email: data.email,
        subject: data.message,
        body: "hello mail, from Contact , Portfolio website",
      };
      try {
        const response = await axios.post(
          "https://p65drtxuxja4jbiupmsjzjugja0ylitp.lambda-url.ap-south-1.on.aws",
          payload
        );
        if (response.data.statusCode === 200) {
          setIsSubmitSuccessful(true);
          reset();
        } else {
          setIsSubmitSuccessful(false);
        }
      } catch (error) {
        setIsSubmitSuccessful(false);
      }
    };

 
  
  return isSubmitSuccessful ? (
    <div>
      <Caption>Successful</Caption>
      <Heading>I will be in touch with you</Heading>
      <Image
        metadata={contactSuccessImage}
        alt="A flying paper plane"
        src={contactSuccessImage}
      />
    </div>
  ) : (
    <form
      onSubmit={handleSubmit(handleSubmitEmail)}
    >
      <fieldset
        disabled={isSubmitting}
        className="group flex flex-col gap-y-6"
      >
        <div>
          <Label htmlFor="contact-form-name">Name</Label>
          <Input
            id="contact-form-name"
            type="text"
            {...register('name')}
          />
        </div>
        <div>
          <Label htmlFor="contact-form-email">Email</Label>
          <Input
            id="contact-form-email"
            type="email"
            className={errors.email ? 'border-error' : ''}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-2 flex items-center text-sm text-error">
              <Icons.Warning
                aria-hidden
                className="me-2 inline size-5"
              />
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
        <Label htmlFor="contact-form-email">Phone</Label>
        <Input
            id="contact-form-email"
            type="number"
            className={errors.phone ? 'border-error' : ''}
            {...register('phone')}
          />
          {errors.phone && (
            <p className="mt-2 flex items-center text-sm text-error">
              <Icons.Warning
                aria-hidden
                className="me-2 inline size-5"
              />
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="contact-form-message">Message</Label>
          <Textarea
            id="contact-form-message"
            {...register('message')}
          />
        </div>
        <div className="flex max-sm:flex-col-reverse max-sm:gap-y-6 sm:items-center sm:justify-between">
          <a
            className="inline-flex items-center text-neutrals-300 transition-colors hover:text-neutrals-50 focus-visible:text-neutrals-50"
            href={`mailto:${data.email}`}
            title="Hit me up"
          >
            <Icons.Envelope
              aria-hidden="true"
              className="me-2 inline size-5"
            />
            {data.email}
          </a>
          <Button
            type="submit"
            className="disabled:cursor-progress max-sm:w-full"
            disabled={!isValid}
          >
            Hit me up
            <div
              aria-hidden
              className="ms-2 inline opacity-70 group-enabled:hidden"
            >
            </div>
            <Icons.Rocket
              aria-hidden
              className="ms-2 inline size-5 group-disabled:hidden"
            />
          </Button>
        </div>
        {errors.root && (
          <p className="mt-2 flex items-center text-sm text-error">
            <Icons.Warning
              aria-hidden
              className="me-2 inline size-5"
            />
            {errors.root.message}
          </p>
        )}
      </fieldset>
    </form>
  );
}

export default ContactForm;
