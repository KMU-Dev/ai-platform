import localforage from "localforage";

localforage.config({
    name: "AI Platform",
    version: 1,
    description: "AI Platform indexed db."
});

export default localforage;
