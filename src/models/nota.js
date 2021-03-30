module.exports = (sequelize, DataTypes) => {
  const Nota = sequelize.define(
    'nota',
    {
      id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id'
        }
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: true
      },
      criadoEm: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      atualizadoEm: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: 'nota',
      timestamps: false
    }
  );

  Nota.associate = function (models) {
    this.belongsTo(models.Usuario, {
      foreignKey: 'usuarioId',
    });
    this.hasMany(models.Checklist, { as: 'checklists', foreignKey: 'notaId' });
    this.hasMany(models.Tag, { as: 'tags', foreignKey: 'notaId' });
  };

  return Nota;
};