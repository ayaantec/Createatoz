using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Core.Interface.Services;
using DD.Core.ViewModel;
using Microsoft.AspNetCore.Authorization;

namespace DD.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NavigationPhotoController : ControllerBase
    {
        private readonly INavigationPhotoService _navigationPhotoService;

        public NavigationPhotoController(INavigationPhotoService navigationPhotoService)
        {
            _navigationPhotoService = navigationPhotoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPhoto()
        {
            return Ok(await _navigationPhotoService.GetAllNavigationPhoto());
        }

        [HttpGet("{id}", Name = "GetPhotoById")]
        public async Task<IActionResult> GetPhotoById(int id)
        {
            var result = await _navigationPhotoService.GetNavigationPhotoById(id);
            if(result != null)
                return Ok(result);

            return NotFound();
        }

        [HttpGet("getSelectedPhoto")]
        public async Task<IActionResult> GetSelectedPhoto()
        {
            var result = await _navigationPhotoService.GetSelectedNavigationPhoto();
            if (result != null)
                return Ok(result);

            return NotFound();
        }

        [Authorize(Roles = "Admin,Collaborator")]
        [HttpPost]
        public async Task<IActionResult> UploadNavigationPhoto([FromForm] UploadNavigationPhoto photo)
        {
            var result = await _navigationPhotoService.UploadNavigationPhoto(photo);
            if (result != null)
                return CreatedAtRoute("GetPhotoById", new { id = result.Id }, result);

            return BadRequest("Can't upload photo");
        }
    }
}
