import { DataTypes, Sequelize } from "sequelize";

/**
 * Recette Builder
 * @param {Sequelize} sequelize
 * @returns 
 */
export default function recetteBuilder(sequelize) {

    const Recette = sequelize.define(
        // Nom du model
        'recette',
        // Les attributs
        {
            id: {
                // Rappel, la clef primaire est "auto-généré" si elle n'est pas défini dans le model
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                autoIncrementIdentity: true
            },
            name: {
                type: DataTypes.STRING(200),
                allowNull: false
            },
            description: {
                type: DataTypes.STRING(1000),
                allowNull: true
            }
        },
        // Les options
        {
            tableName: 'Recette',
            updatedAt: false,
            indexes: [
                {
                    name: 'IDX_Recette__Name',
                    fields: ['name'],
                    unique: false
                }
            ]
        }
    );

    return Recette;
}