import { components } from 'react-select';
import Creatable from 'react-select/creatable';
import * as BsIcon from 'react-icons/bs';
import professions from 'professions';
import { useEffect, useRef, useState } from 'react';
import { verifyInput } from '../pages/DefaultRoutes/resume/resume-builder/screens/verification';

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator
      className="bg-primary-600 rounded-sm cursor-pointer p-4"
      {...props}
    >
      <BsIcon.BsSearch />
    </components.DropdownIndicator>
  );
};

function JobTitleInput({
  auth,
  title,
  handleInputChange,
  section,
  subsection,
}) {
  const [professionOption, setProfessionOption] = useState([]);
  const errorMessage = useRef(null);

  useEffect(() => {
    const storedProfession =
      JSON.parse(sessionStorage.getItem('profession')) || [];

    if (storedProfession.length >= 1) {
      storedProfession.map((obj) =>
        setProfessionOption((prev) => [...prev, obj])
      );
    }

    professions.map((obj) =>
      setProfessionOption((prev) =>
        [
          ...prev,
          { label: obj, value: obj.charAt(0).toUpperCase() + obj.slice(1) },
        ].sort((a, b) => {
          let va = a.value.toLowerCase(),
            vb = b.value.toLowerCase();

          if (va < vb) {
            return -1;
          }
          if (va > vb) {
            return 1;
          }
          return 0;
        })
      )
    );
  }, []);

  const handleChange = (opt) => {
    handleInputChange({
      section: section,
      subsection: subsection,
      values: opt.value,
    });

    if (auth) {
      verifyInput(opt.value, errorMessage.current, 'jobTitle');
    }
  };

  const handleAddProfession = (opt) => {
    handleChange({ label: opt, value: opt });

    const storedProfession =
      JSON.parse(sessionStorage.getItem('profession')) || [];

    if (storedProfession.length >= 1) {
      sessionStorage.setItem(
        'profession',
        JSON.stringify([...storedProfession, { label: opt, value: opt }])
      );
    } else {
      const profession = [{ label: opt, value: opt }];
      sessionStorage.setItem('profession', JSON.stringify(profession));
    }

    setProfessionOption((prev) => [...prev, { label: opt, value: opt }]);
  };

  return (
    <>
      <Creatable
        className="mb-6 text-[11px] w-full text-[#8C8C8F] border border-neutral-500 outline-0 rounded-[4px] bg-[#f9f9f9] relative z-40"
        inputId="jobTitle"
        placeholder="Job Title"
        components={{ DropdownIndicator }}
        defaultInputValue={title}
        onChange={(opt) => handleChange(opt)}
        onCreateOption={handleAddProfession}
        styles={{
          control: (base) => ({
            ...base,
            borderStyle: 'none',
            boxShadow: 'none',
            background: 'transparent',
          }),
          option: (base) => ({
            ...base,
            '&:hover': {
              color: 'white',
            },
          }),
          dropdownIndicator: (base) => ({
            ...base,
            padding: '1rem',
            color: 'white',
            '&:hover': {
              color: 'white',
            },
          }),
          indicatorsContainer: (base, state) => ({
            ...base,
            display: state.isFocused ? 'none' : 'flex',
          }),
          indicatorSeparator: (base, state) => ({
            ...base,
            display: state.isFocused ? 'flex' : 'none',
          }),
        }}
        options={professionOption}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: '#eae6ff',
            primary: '#D1D1D2',
          },
        })}
      />
      <label
        id="jobTitleError"
        htmlFor="jobTitle"
        className="absolute -mt-5 mb-1 pl-4 text-xs text-error-500 hidden"
        ref={errorMessage}
      ></label>
    </>
  );
}

export default JobTitleInput;
