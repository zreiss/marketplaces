import React from "react";
import {useForm} from "react-hook-form";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
} from "@chakra-ui/react";
import {useSession} from "next-auth/react";

const NewMarketplace = () => {
    // const utils = api.useContext();
    const {data: sessionData} = useSession();

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
    } = useForm()

    function onSubmit(values) {
        return new Promise((resolve) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                resolve()
            }, 3000)
        })
    }

    console.log("ERRORS", errors, !!(errors.name && errors.name.message));

    return (
        <>
            <form className={"flex flex-col w-1/3"} onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                        id='name'
                        placeholder='name'
                        {...register('name', {required: true})}
                    />
                    <FormErrorMessage>
                        Please enter a name
                    </FormErrorMessage>
                </FormControl>

                <FormControl mt={3} isInvalid={errors.url}>
                    <FormLabel htmlFor="url">Marketplace URL</FormLabel>
                    <Input
                        id='url'
                        placeholder='url'
                        {...register('url', {required: true})}
                    />
                    <FormErrorMessage>
                        Please enter a url
                    </FormErrorMessage>
                </FormControl>

                <FormControl mt={3} isInvalid={errors.image}>
                    <FormLabel htmlFor="image">Image URL</FormLabel>
                    <Input
                        id='image'
                        placeholder='image'
                        {...register('image', {required: true})}
                    />
                    <FormErrorMessage>
                        Please enter a image url
                    </FormErrorMessage>
                </FormControl>

                <Button mt={4} colorScheme="teal" type="submit">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default NewMarketplace