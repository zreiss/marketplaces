import React from "react";
import {api} from "~/utils/api";
import {useRouter} from "next/router";
import {useForm } from "react-hook-form";

import {
    Input,
    Image,
    FormLabel,
    FormControl,
    Button, Text,
    FormErrorMessage, Link,
} from "@chakra-ui/react";
import {ExternalLinkIcon} from "@chakra-ui/icons";

const NewMarketplace = () => {
    const router = useRouter()
    const utils = api.useContext();
    const {
        handleSubmit,
        register,
        formState: {errors},
        watch,

    } = useForm()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const marketName = watch("name");

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const imageUrl = watch("image_url");

    const createMarketplace = api.marketplaces.create.useMutation({
        onSuccess: () => {
            void utils.marketplaces.getAll.invalidate();
            void router.push("/marketplaces");
        },
    });

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
            <Text mt={4} fontSize={"4xl"}>Create New Marketplace</Text>

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
                    <FormLabel htmlFor="image">
                        Image URL
                        {marketName && (
                            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                            <Link ml={2} mt={0} href={`https://icons8.com/icons/set/${marketName}`} isExternal>
                                <ExternalLinkIcon mx='2px'/>
                            </Link>
                        )}
                    </FormLabel>
                    <Input
                        id='image_url'
                        placeholder='Enter a url to the marketplace image'
                        {...register('image_url', {required: true})}
                    />
                    <FormErrorMessage>
                        Please enter a image url
                    </FormErrorMessage>
                </FormControl>
                <div className="flex justify-center">
                {imageUrl && (
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    <Image mt={4} w={100} src={imageUrl} alt={marketName}/>
                )}
                </div>

                <Button mt={4} colorScheme="teal" type="submit">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default NewMarketplace