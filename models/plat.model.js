import { DataTypes, Sequelize } from "sequelize";

/**
 * Plat Builder
 * @param {Sequelize} sequelize
 * @returns 
 */
export default function platBuilder(sequelize) {

    const Plat = sequelize.define(
        'plat',
        {
            name: {
                type: DataTypes.STRING(50),
                unique: 'UK_Plat__Name',
                allowNull: false
            }
        },
        {
            tableName: 'Plat',
            timestamps: false
        }
    );

    return Plat;
}