import { DataTypes, Sequelize } from "sequelize";

/**
 * Ingredient Builder
 * @param {Sequelize} sequelize
 * @returns 
 */
export default function ingredientBuilder(sequelize) {

    const Ingredient = sequelize.define(
        // Nom du Model
        'ingredient',
        // Attributs
        {
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: 'UK_Ingredient__Name'
            },
            allergen: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            }
        },
        // Options
        {
            tableName: "Ingredient",
            timestamps: false
        }
    );

    return Ingredient;
}