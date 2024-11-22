import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import JobSearchForm from '@/components/JobSearchForm';
import axios from 'axios';

export default function Home() {
  const [formData, setFormData] = useState(null)

  const onSubmit = async (data) => {
    const url =  `https://sharing-jackal-stunning.ngrok-free.app/api/config?username=${data.username}`;
    setFormData(data)
    try {
      const response = await axios.post(url, {
        ...data
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Autoapply Form</h1>
      <JobSearchForm onSubmit={onSubmit} />
      {formData && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Form Data:</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}