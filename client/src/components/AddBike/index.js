import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@apollo/client";
import { ADD_BIKE, UPDATE_STATUS } from "../../utils/mutations";

const AddBike = () => {
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);

    // create a new bike
    const [formState, setFormState] = useState({
        brand: "",
        bike_model: "",
        year: "",
        serial: "",
        description: "",
        image: "",
    });
    // set status of new bike
    const [statusState, setStatusState] = useState({
        location: "",
        isLost: "",
    });

    const [addBike] = useMutation(ADD_BIKE);
    const [addStatus] = useMutation(UPDATE_STATUS);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    const handleChangeStatus = (event) => {
        let isLost;
        const status = document.querySelector('[name="status"]').value;
        if (status === "Not missing") {
            isLost = false;
        } else {
            isLost = true;
        }
        const location = document.querySelector("#location").value;
        setStatusState({
            isLost,
            location,
        });
    };
    // submit form,  pass the data from the form state object as variables for our addUser mutation function
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        console.log(statusState);
        // use try/catch instead of promises to handle errors
        try {
            // execute addBike mutation and pass in variable data from form
            const data = await addBike({
                variables: { ...formState },
            });
            const bikeId = data?._id;
            setBikeStatus(bikeId, statusState.isLost, statusState.location);

            setFormState({
                brand: "",
                bike_model: "",
                year: "",
                serial: "",
                description: "",
                image: "",
            });
            setStatusState({
                location: "",
                isLost: "",
            });
            console.log("form from addBike:", data);
        } catch (e) {
            console.error(e);
        }
    };

    async function setBikeStatus(bikeId, isLost, location) {
        try {
            const statusData = await addStatus({
                variables: { bikeId, isLost, location },
            });
            console.log(statusData);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <button
                className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setOpen((open) => !open)}
            >
                Add a Bike
            </button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    auto-reopen="true"
                    className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    onClose={setOpen}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <span
                                                role="img"
                                                aria-label="bike Emoji"
                                            >
                                                🚴
                                            </span>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg leading-6 font-medium text-gray-900"
                                            >
                                                Add a Bike
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    The more information you can
                                                    provide about your bike, the
                                                    easier it will be for law
                                                    enforcement and other users
                                                    to try to identify it if it
                                                    is ever lost or stolen!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 md:mt-0 md:col-span-2">
                                    <form
                                        action="#"
                                        method="POST"
                                        onSubmit={handleFormSubmit}
                                    >
                                        <div className="shadow overflow-hidden sm:rounded-md">
                                            <div className="px-4 py-5 bg-white sm:p-6">
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label
                                                        htmlFor="status"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Bike's current status
                                                    </label>
                                                    <select
                                                        id="status"
                                                        name="status"
                                                        onChange={
                                                            handleChangeStatus
                                                        }
                                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    >
                                                        <option>
                                                            Not missing
                                                        </option>
                                                        <option>Missing</option>
                                                    </select>
                                                </div>
                                                <div className="grid grid-cols-6 gap-6">
                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label
                                                            htmlFor="brand"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Brand
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="brand"
                                                            id="brand"
                                                            value={
                                                                formState.brand
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label
                                                            htmlFor="model"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Model
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="bike_model"
                                                            id="bike_model"
                                                            value={
                                                                formState.bike_model
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label
                                                            htmlFor="year"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Year
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="year"
                                                            id="year"
                                                            value={
                                                                formState.year
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label
                                                            htmlFor="serial"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Serial Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="serial"
                                                            id="serial"
                                                            value={
                                                                formState.serial
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                        <label
                                                            htmlFor="city"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            City
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="location"
                                                            id="location"
                                                            value={
                                                                statusState.location
                                                            }
                                                            onChange={
                                                                handleChangeStatus
                                                            }
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                    <div className="col-span-6">
                                                        <label
                                                            htmlFor="description"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Description
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="description"
                                                            id="description"
                                                            value={
                                                                formState.description
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                </div>
                                                {/* ------------------------------------------------------------------------------------------------------------------------------------------------- */}

                                                {/* <article
                                                    aria-label="File Upload Modal"
                                                    class="relative h-full flex flex-col bg-white shadow-xl rounded-md"
                                                    ondrop="dropHandler(event);"
                                                    ondragover="dragOverHandler(event);"
                                                    ondragleave="dragLeaveHandler(event);"
                                                    ondragenter="dragEnterHandler(event);"
                                                >
                                                    <div
                                                        id="overlay"
                                                        class="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md"
                                                    >
                                                        <i>
                                                            <svg
                                                                class="fill-current w-12 h-12 mb-3 text-blue-700"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
                                                            </svg>
                                                        </i>
                                                        <p class="text-lg text-blue-700">
                                                            Drop files to upload
                                                        </p>
                                                    </div>

                                                    <section class="h-full overflow-auto p-8 w-full h-full flex flex-col">
                                                        <header class="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                                                            <p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                                                                <span>
                                                                    Drag and
                                                                    drop your
                                                                </span>
                                                                &nbsp;
                                                                <span>
                                                                    files
                                                                    anywhere or
                                                                </span>
                                                            </p>
                                                            <input
                                                                id="hidden-input"
                                                                type="file"
                                                                multiple
                                                                class="hidden"
                                                            />
                                                            <button
                                                                id="button"
                                                                class="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                                                            >
                                                                Upload a file
                                                            </button>
                                                        </header>

                                                        <h1 class="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                                                            To Upload
                                                        </h1>

                                                        <ul
                                                            id="gallery"
                                                            class="flex flex-1 flex-wrap -m-1"
                                                        >
                                                            <li
                                                                id="empty"
                                                                class="h-full w-full text-center flex flex-col items-center justify-center items-center"
                                                            >
                                                                <img
                                                                    class="mx-auto w-32"
                                                                    src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                                                                    alt="no data"
                                                                />
                                                                <span class="text-small text-gray-500">
                                                                    No files
                                                                    selected
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </section>

                                                    <footer class="flex justify-end px-8 pb-8 pt-4">
                                                        <button
                                                            id="submit"
                                                            class="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
                                                        >
                                                            Upload now
                                                        </button>
                                                        <button
                                                            id="cancel"
                                                            class="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </footer>
                                                </article> */}
                                                {/* ------------------------------------------------------------------------------------------------------------------------------------------------- */}
                                                {/* <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Image
                                                    </label>
                                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                        <div className="space-y-1 text-center">
                                                            <svg
                                                                className="mx-auto h-12 w-12 text-gray-400"
                                                                stroke="currentColor"
                                                                fill="none"
                                                                viewBox="0 0 48 48"
                                                                aria-hidden="true"
                                                            >
                                                                <path
                                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                            <div className="flex text-sm text-gray-600">
                                                                <label
                                                                    htmlFor="file-upload"
                                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                                >
                                                                    <span>
                                                                        Upload a
                                                                        file
                                                                    </span>
                                                                    <input
                                                                        id="file-upload"
                                                                        name="file-upload"
                                                                        type="file"
                                                                        value={
                                                                            formState.image
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                        className="sr-only"
                                                                    />
                                                                </label>
                                                                <p className="pl-1">
                                                                    or drag and
                                                                    drop
                                                                </p>
                                                            </div>
                                                            <p className="text-xs text-gray-500">
                                                                PNG, JPG, GIF up
                                                                to 10MB
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </div>
                                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6"></div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                            <button
                                                type="submit"
                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                onClick={() => setOpen(false)}
                                            >
                                                Add bike
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                onClick={() => setOpen(false)}
                                                ref={cancelButtonRef}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default AddBike;
