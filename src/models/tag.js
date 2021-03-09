module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'tag',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      notaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'nota',
          key: 'id'
        }
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'tag',
      timestamps: false
    }
  );

  Tag.associate = function (models) {
    this.belongsTo(models.Nota, {
      foreignKey: 'notaId'
    });
  };

  return Tag
};