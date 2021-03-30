module.exports = (sequelize, DataTypes) => {
  const Checklist = sequelize.define(
    'checklist',
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
      descricao: {
        type: DataTypes.STRING,
        allowNull: false
      },
      concluida: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
    },
    {
      tableName: 'checklist',
      timestamps: false
    }
  );

  Checklist.associate = function (models) {
    this.belongsTo(models.Nota, {
      foreignKey: 'notaId'
    });
  };

  return Checklist;
};