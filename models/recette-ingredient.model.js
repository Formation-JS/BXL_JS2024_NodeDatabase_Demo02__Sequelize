import { DataTypes, Sequelize } from "sequelize";

/**
 * RecetteIngredient Builder
 * @param {Sequelize} sequelize
 * @returns 
 */
export default function recetteIngredientBuilder(sequelize) {

    const RecetteIngredient = sequelize.define(
        'Recette_Ingredient',
        {
            quantity: {
                type: DataTypes.REAL,
                allowNull: false,
                validate: {
                    // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#per-attribute-validations
                    isPositive(value) {
                        if(value <= 0) throw new Error('Negative quantity is not allow !');
                    } 
                }
            },
            unite: {
                type: DataTypes.STRING(50),
                allowNull: false
            }
        },
        {
            tableName: 'Recette_Ingredient',
            timestamps: false
        }
    );

    return RecetteIngredient;
}