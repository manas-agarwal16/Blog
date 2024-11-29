import React , {useId} from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

const CustomEditor = ({
  name = "editor",
  label,
  defaultValue = "",
  control,
  ...props
}) => {
    const id = useId();
  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={id} className="my-2 inline-block font-semibold">
          {label}
        </label>
      ) : null}
      <Controller
        id={id}
        name={name}
        control={control}
        defaultValue={defaultValue}
        //field contains:
        // value: The current input value.
        // onChange: The handler to update the form's state when the input value changes.
        // onBlur: Used for validation or marking the field as "touched."
        // name: The name "example," as defined in the name prop.
        // ref: Used internally by React Hook Form to manage the DOM element.
        render={({ field }) => (
          <Editor
            initialValue={defaultValue}
            init={{
              height: 400,
              menubar: false,
              apiKey: '2uim0kzm98ljgk308tdfzanezonq0fi8h2j1696u9sd4qw3r',
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
            }}
            {...props} //onChange and all
            onEditorChange={field.onChange} // call onChange when editor content changes
          />
        )}
      />
    </div>
  );
};

export default CustomEditor;
