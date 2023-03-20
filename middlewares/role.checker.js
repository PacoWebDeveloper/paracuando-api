const ProfilesService = require('../services/profiles.service')
const { CustomError } = require('../utils/helpers')

const profilesService = new ProfilesService()

const isAdmin = async (id)  => {
  try {

    let isSuperUser = await profilesService.isAdminVerification(id)
    
    return isSuperUser

  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  isAdmin
}