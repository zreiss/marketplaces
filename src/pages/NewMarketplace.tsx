import React from "react";
import {useForm} from "react-hook-form";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
} from "@chakra-ui/react";

const NewMarketplace = () => {
    // const utils = api.useContext();

    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    function onSubmit(values) {
        // eslint-disable-next-line no-console
        console.log(values)
    }

    return (
        <>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form className={"flex flex-col w-1/3"} onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.name}>
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

                <FormControl mt={3} isInvalid={!!errors.url}>
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

                <FormControl mt={3} isInvalid={!!errors.image}>
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