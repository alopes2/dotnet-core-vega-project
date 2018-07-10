IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

CREATE TABLE [Makes] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(255) NOT NULL,
    CONSTRAINT [PK_Makes] PRIMARY KEY ([Id])
);

GO

CREATE TABLE [Models] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(255) NOT NULL,
    [MakeId] int NOT NULL,
    CONSTRAINT [PK_Models] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Models_Makes_MakeId] FOREIGN KEY ([MakeId]) REFERENCES [Makes] ([Id]) ON DELETE CASCADE
);

GO

CREATE INDEX [IX_Models_MakeId] ON [Models] ([MakeId]);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20180620141800_InitialModel', N'2.1.1-rtm-30846');

GO

INSERT INTO Makes (Name) VALUES ('Make1')

GO

INSERT INTO Makes (Name) VALUES ('Make2')

GO

INSERT INTO Makes (Name) VALUES ('Make3')

GO

INSERT INTO Models (Name, MakeId) VALUES ('Make1-ModelA', (SELECT ID FROM Makes WHERE Name = 'Make1'))

GO

INSERT INTO Models (Name, MakeId) VALUES ('Make1-ModelB', (SELECT ID FROM Makes WHERE Name = 'Make1'))

GO

INSERT INTO Models (Name, MakeId) VALUES ('Make1-ModelC', (SELECT ID FROM Makes WHERE Name = 'Make1'))

GO

INSERT INTO Models (Name, MakeId) VALUES ('Make2-ModelA', (SELECT ID FROM Makes WHERE Name = 'Make2'))

GO

INSERT INTO Models (Name, MakeId) VALUES ('Make2-ModelB', (SELECT ID FROM Makes WHERE Name = 'Make2'))

GO

INSERT INTO Models (Name, MakeId) VALUES ('Make2-ModelC', (SELECT ID FROM Makes WHERE Name = 'Make2'))

GO

INSERT INTO Models (Name, MakeId) VALUES ('Make3-ModelA', (SELECT ID FROM Makes WHERE Name = 'Make3'))

GO

INSERT INTO Models (Name, MakeId) VALUES ('Make3-ModelB', (SELECT ID FROM Makes WHERE Name = 'Make3'))

GO

INSERT INTO Models (Name, MakeId) VALUES ('Make3-ModelC', (SELECT ID FROM Makes WHERE Name = 'Make3'))

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20180620142709_SeedDatabase', N'2.1.1-rtm-30846');

GO

CREATE TABLE [Features] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(255) NOT NULL,
    CONSTRAINT [PK_Features] PRIMARY KEY ([Id])
);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20180620165157_AddFeaturesModel', N'2.1.1-rtm-30846');

GO

INSERT INTO Features (Name) VALUES ('Feature1')

GO

INSERT INTO Features (Name) VALUES ('Feature2')

GO

INSERT INTO Features (Name) VALUES ('Feature3')

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20180620165819_SeedFeaturesTable', N'2.1.1-rtm-30846');

GO

CREATE TABLE [Vehicles] (
    [Id] int NOT NULL IDENTITY,
    [ModelId] int NOT NULL,
    [IsRegistered] bit NOT NULL,
    [ContactName] nvarchar(255) NOT NULL,
    [ContactEmail] nvarchar(255) NULL,
    [ContactPhone] nvarchar(255) NOT NULL,
    [LastUpdate] datetime2 NOT NULL,
    CONSTRAINT [PK_Vehicles] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Vehicles_Models_ModelId] FOREIGN KEY ([ModelId]) REFERENCES [Models] ([Id]) ON DELETE CASCADE
);

GO

CREATE TABLE [VehicleFeatures] (
    [VehicleId] int NOT NULL,
    [FeatureId] int NOT NULL,
    CONSTRAINT [PK_VehicleFeatures] PRIMARY KEY ([VehicleId], [FeatureId]),
    CONSTRAINT [FK_VehicleFeatures_Features_FeatureId] FOREIGN KEY ([FeatureId]) REFERENCES [Features] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_VehicleFeatures_Vehicles_VehicleId] FOREIGN KEY ([VehicleId]) REFERENCES [Vehicles] ([Id]) ON DELETE CASCADE
);

GO

CREATE INDEX [IX_VehicleFeatures_FeatureId] ON [VehicleFeatures] ([FeatureId]);

GO

CREATE INDEX [IX_Vehicles_ModelId] ON [Vehicles] ([ModelId]);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20180621170247_AddVehicle', N'2.1.1-rtm-30846');

GO

CREATE TABLE [Photos] (
    [Id] int NOT NULL IDENTITY,
    [FileName] nvarchar(255) NOT NULL,
    [VehicleId] int NULL,
    CONSTRAINT [PK_Photos] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Photos_Vehicles_VehicleId] FOREIGN KEY ([VehicleId]) REFERENCES [Vehicles] ([Id]) ON DELETE NO ACTION
);

GO

CREATE INDEX [IX_Photos_VehicleId] ON [Photos] ([VehicleId]);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20180629172822_AddPhoto', N'2.1.1-rtm-30846');

GO

