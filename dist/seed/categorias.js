"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSpecialties = exports.addCategories = exports.specialties = exports.categories = void 0;
const Category_model_1 = __importDefault(require("../models/Category.model"));
const Specialty_model_1 = __importDefault(require("../models/Specialty.model"));
exports.categories = [
    { name: "Health and Wellness", customId: 1 },
    { name: "Technology and Computing", customId: 2 },
    { name: "Arts and Entertainment", customId: 3 },
    { name: "Education and Teaching", customId: 4 },
    { name: "Business and Finance", customId: 5 },
    { name: "Sports and Fitness", customId: 6 },
    { name: "Science and Medicine", customId: 7 },
    { name: "Home and Gardening", customId: 8 },
    { name: "Gastronomy", customId: 9 },
    { name: "Fashion and Beauty", customId: 10 },
];
// each customId will match the customId of the already existing categories
exports.specialties = [
    { name: "Nutrition", categoryId: "", customId: 1 },
    { name: "Physiotherapy", categoryId: "", customId: 1 },
    { name: "Psychology", categoryId: "", customId: 1 },
    { name: "Web Development", categoryId: "", customId: 2 },
    { name: "Cybersecurity", categoryId: "", customId: 2 },
    { name: "Artificial Intelligence", categoryId: "", customId: 2 },
    { name: "Music", categoryId: "", customId: 3 },
    { name: "Painting", categoryId: "", customId: 3 },
    { name: "Cinema", categoryId: "", customId: 3 },
    { name: "Language Teaching", categoryId: "", customId: 4 },
    { name: "Mathematics", categoryId: "", customId: 4 },
    { name: "History", categoryId: "", customId: 4 },
    { name: "Accounting", categoryId: "", customId: 5 },
    { name: "Marketing", categoryId: "", customId: 5 },
    { name: "Project Management", categoryId: "", customId: 5 },
    { name: "Personal Training", categoryId: "", customId: 6 },
    { name: "Yoga", categoryId: "", customId: 6 },
    { name: "Swimming", categoryId: "", customId: 6 },
    { name: "Biology", categoryId: "", customId: 7 },
    { name: "Chemistry", categoryId: "", customId: 7 },
    { name: "Medicine", categoryId: "", customId: 7 },
    { name: "Interior Design", categoryId: "", customId: 8 },
    { name: "Gardening", categoryId: "", customId: 8 },
    { name: "Home Maintenance", categoryId: "", customId: 8 },
    { name: "International Cuisine", categoryId: "", customId: 9 },
    { name: "Pastry", categoryId: "", customId: 9 },
    { name: "Enology", categoryId: "", customId: 9 },
    { name: "Fashion Design", categoryId: "", customId: 10 },
    { name: "Makeup", categoryId: "", customId: 10 },
    { name: "Styling", categoryId: "", customId: 10 },
];
const addCategories = (categories) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // toma el array de categorías, donde cada uno tiene su nombre y id propio
        const addArray = categories.map((category) => {
            // Y cada elemento del array lo convierte en una promesa,
            // la cual una vez cumplida, los agrega a la base de datos
            return Category_model_1.default.create(category);
        });
        // Y esta línea agrega todos los elementos a la base de datos
        // Vale la pena resaltar que MongoDB se encargará de darle un identificador único
        // a cada categoría, y será útil para asignarle el id de categoría a cada especialidad
        yield Promise.allSettled(addArray);
        console.log(addArray);
        return "Carga completa";
    }
    catch (error) {
        console.log(error);
    }
});
exports.addCategories = addCategories;
const addSpecialties = (specialties) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Consigue todas las categorías que se han agregado a la base de datos
        const categories = yield Category_model_1.default.find();
        // Luego, toma todas las especialidades e itera sobre todas ellas.
        const newArray = specialties.map((specialty) => {
            // Recorre todo el array de categorías que se sacó de la base de datos.
            // también toma el índice
            for (let index = 0; index < categories.length; index++) {
                // Si el customId de la especialidad que viene del array de especialidades
                // coincide con el customId de cada categoría que se está recorriendo,
                if (specialty.customId === categories[index].customId) {
                    // entonces se le agrega un campo llamado categoryId, el cual es el mismo
                    // id que tiene la categoría que MongoDB le añadió por defecto
                    specialty.categoryId = categories[index].id;
                    // Y se crea el array de promesas
                    return Specialty_model_1.default.create(specialty);
                }
            }
        });
        // que una vez ejecutados, agregarán las especialidades a la base de datos
        yield Promise.allSettled(newArray);
        console.log(newArray);
        return "Seed completo";
    }
    catch (error) {
        console.log(error);
    }
});
exports.addSpecialties = addSpecialties;
