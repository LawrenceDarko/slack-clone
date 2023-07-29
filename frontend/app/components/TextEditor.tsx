'use client'
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const TextEditor = () => {
    const [value, setValue] = useState('');
    console.log(value)
    return <ReactQuill className='w-full' theme="snow" value={value} onChange={setValue} />;
}

export default TextEditor