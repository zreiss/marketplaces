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
import {api} from "~/utils/api";
import { useRouter } from "next/router";

const NewMarketplace = () => {
    const router = useRouter()
    const utils = api.useContext();
    const {data: sessionData} = useSession();

    const createMarketplace = api.marketplaces.create.useMutation({
        onSuccess: () => {
            void utils.marketplaces.getAll.invalidate();
            void router.push("/marketplaces");
        },
    });

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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        createMarketplace.mutate(values)
    }

    return (
        <>
            
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form className={"flex flex-col w-1/3 mt-4"} onSubmit={handleSubmit(onSubmit)}>
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

                <FormControl mt={3} isInvalid={!!errors.image}>
                    <FormLabel htmlFor="slug">Slug</FormLabel>
                    <Input
                        id='slug'
                        placeholder='Enter a url to the marketplace slug'
                        {...register('slug', {required: true})}
                    />
                    <FormErrorMessage>
                        Please enter a Slug
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
                        id='image_url'
                        placeholder='Enter a url to the marketplace image'
                        {...register('image_url', {required: false})}
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